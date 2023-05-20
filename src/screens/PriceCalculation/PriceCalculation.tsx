import React from "react";
import ProductHeaderCard from "./components/ProductHeaderCard/ProductHeaderCard";
import { Divider } from "@mui/material";
import PriceListing from "./components/PriceListing/PriceListing";

interface Props {}

export default function PriceCalculation(props: Props) {
	return (
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
			<div className="flex">
				<div className="w-[640px] mr-[35px]">
					<PriceListing priceList={[]} />
				</div>
				<div></div>
			</div>
		</div>
	);
}
