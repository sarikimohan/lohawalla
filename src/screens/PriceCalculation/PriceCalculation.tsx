import React, { useState, useEffect, useContext } from "react";
import ProductHeaderCard from "./components/ProductHeaderCard/ProductHeaderCard";
import { Divider } from "@mui/material";
import PriceListing from "./components/PriceListing/PriceListing";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import PriceCalculationAction from "./actions/PriceCalculationAction";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";
import getRoundedVal from "@src/modules/Utils/getRoundedVal";
import PriceCalculationInstance from "./fetch/instance";
import PriceCalculator from "./calculators/PriceCalculator/PriceCalculator";
import CashCalculator from "./actions/CashCalculator";
import CreditCalculator from "./actions/CreditCalculator";
import { useParams } from "react-router-dom";
import useHeight from "@src/modules/hooks/useHeight";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";
import LoadingWidget from "@src/Components/widget/LoadingWidget/LoadingWidget";

interface Props {}
interface ContextProps {
	cashCalcActions: CashCalculator;
	state: StateWithLoading<PriceCalculation.State>;
	creditCalcActions: CreditCalculator;
	priceCalcActions: PriceCalculationAction;
}

const CalculationContext = React.createContext<ContextProps>(
	{} as ContextProps
);
export const useCalculationContext = () => useContext(CalculationContext);

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
			taxableValue: "",
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
			gst: "",
		},
		loading: {
			fetchData: AsyncStateFactory(),
		},
		selectedCalculator: 0,
	});

	const priceCalcActions = new PriceCalculationAction(state, setState);
	const cashCalcActions = new CashCalculator(state, setState);
	const creditCalcActions = new CreditCalculator(state, setState);

	const { id } = useParams();

	useEffect(() => {
		if (id) priceCalcActions.fetch(id);
	}, []);

	const heightService = useHeight();

	if (!id)
		return (
			<>
				<p className="text-xl">no id given</p>
			</>
		);

	return (
		<CalculationContext.Provider
			value={{ cashCalcActions, state, creditCalcActions, priceCalcActions }}
		>
			<LoadingBoundary
				asyncState={state.loading.fetchData}
				loadingWidget={<LoadingWidget />}
			>
				<div style={{ width: "100%", minHeight: "100vh" }}>
					<div ref={heightService.ref}>
						<BackNavBar title={"Price Calculation"} />
					</div>
					<div
						style={{
							overflow: "auto",
							padding: "50px",
							width: "100%",
							height: `calc(100vh - ${heightService.height}px)`,
						}}
						className="bg-offWhite"
					>
						<ProductHeaderCard
							data={{
								name: state.calculationData.productName,
								bottomLeftText: state.calculationData.companyName,
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
				</div>
			</LoadingBoundary>
		</CalculationContext.Provider>
	);
}
