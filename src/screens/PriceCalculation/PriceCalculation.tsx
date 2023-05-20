import React, { useState, useEffect } from "react";
import ProductHeaderCard from "./components/ProductHeaderCard/ProductHeaderCard";
import { Divider } from "@mui/material";
import PriceListing from "./components/PriceListing/PriceListing";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import PriceCalculationAction from "./actions/PriceCalculationAction";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";
import getRoundedVal from "@src/modules/Utils/getRoundedVal";
import PriceCalculationInstance from "./fetch/instance";
import PriceCalculator from "./calculators/PriceCalculator/PriceCalculator";

interface Props {}

export default function PriceCalculation(props: Props) {
	const [state, setState] = useState<StateWithLoading<PriceCalculation.State>>({
		calculationData: {
			productName: "",
			companyName: "",
			productImage: "",
			priceStructureUnit: "",
			priceField: [],
			margin: {
				cash: 0,
				online: 0,
			},
			negotiation: 0,
			creditMargin: [],
			GST: {
				type: "",
				value: 0,
			},
		},
		renderPriceList: [],
		netSum: 0,
		cashCalculator: {
			startValue: 0,
			endValue: 0,
			currentValue: 0,
			netMarginInput: { value: "" },
			taxableValue: 0,
			netTotal: 0,
		},
		creditCalculator: {
			selectedDays: 0,
			startValue: 0,
			endValue: 0,
			currentValue: 0,
			netMarginInput: { value: "" },
			taxableValue: 0,
			netTotal: 0,
		},
		onlineCalculator: {
			marginValue: 0,
			taxableValue: 0,
			netTotal: 0,
		},
		loading: {
			fetchData: AsyncStateFactory(),
		},
	});

	const priceCalcActions = new PriceCalculationAction(state, setState);
	useEffect(() => {
		priceCalcActions.fetch("6468672de4f0808edfcebc26");
	}, []);

	console.log(state.renderPriceList);

	return (
		<LoadingBoundary asyncState={state.loading.fetchData}>
			<div
				style={{
					overflow: "auto",
					padding: "50px",
					width: "100%",
				}}
			>
				<ProductHeaderCard
					data={{
						name: "JSW.LTD Tmt bar 8mm ",
						bottomLeftText: "JSW.LTD",
						bottomRightText: "Sold 528 tons",
					}}
				/>
				<div className="my-6">
					<Divider />
				</div>
				<div className="flex justify-between">
					<div className="basis-7/12 mr-[35px]">
						<PriceListing
							priceList={state.renderPriceList}
							total={getRoundedVal(priceCalcActions.getTotal())}
						/>
					</div>
					<div className="grow">
						<PriceCalculator />
					</div>
				</div>
			</div>
		</LoadingBoundary>
	);
}
