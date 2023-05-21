import { Box, Card, Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import CashMarginCalculator from "./components/CashMarginCalculator/CashMarginCalculator";
import CreditMarginCalculator from "./components/CreditMarginCalculator/CreditMarginCalculator";
import OnlineMarginCalculator from "./components/OnlineMarginCalculator/OnlineMarginCalculator";
import DisplayFlop from "../../components/DisplayFlop/DisplayFlop";
import { useCalculationContext } from "../../PriceCalculation";

function PriceCalculator() {
	const { state, priceCalcActions } = useCalculationContext();
	const selectedEntry =
		state.calculationData.creditMargin[state.creditCalculator.selectedDays];

	return (
		<Card
			variant="outlined"
			sx={{ borderRadius: "12px", width: "100%" }}
			className="p-6"
		>
			<Box padding={2} display="flex">
				<p
					style={{
						fontFamily: "var(--font-inter)",
						fontSize: 24,
						fontWeight: 500,
						letterSpacing: -1,
					}}
					className="fcolor-fuschia mr-4"
				>
					Margin
				</p>
				<img src="/icons/Recipt.svg" />
			</Box>
			<Box
				width={"100%"}
				sx={{ background: "lightgrey", height: 1.1 }}
				marginTop={2}
				marginBottom={2}
			/>
			<Grid container className="mb-4">
				<Grid item xs={4}>
					<DisplayFlop
						buttonText="Cash"
						labelText={state.calculationData.margin.cash + "%"}
						onClick={() => {
							priceCalcActions.setCalculator(0);
						}}
						isActive={state.selectedCalculator === 0}
					/>
				</Grid>
				<Grid item xs={4}>
					<DisplayFlop
						buttonText="Credit"
						labelText={
							selectedEntry?.type === "numeric"
								? selectedEntry?.value + "rs"
								: selectedEntry?.value + "%"
						}
						onClick={() => {
							priceCalcActions.setCalculator(1);
						}}
						isActive={state.selectedCalculator === 1}
					/>
				</Grid>
				<Grid item xs={4}>
					<DisplayFlop
						buttonText="Online"
						isActive={state.selectedCalculator === 2}
						labelText={state.calculationData.margin.online + "%"}
						onClick={() => {
							priceCalcActions.setCalculator(2);
						}}
					/>
				</Grid>
			</Grid>
			<Card variant="outlined" sx={{ borderRadius: "12px" }} className="p-6">
				<Box marginBottom={2}>
					<p
						style={{
							fontSize: 24,
							fontWeight: "bold",
							color: "var(--fuschia)",
							fontFamily: "var(--font-inter)",
						}}
					>
						Net Total
						<span
							style={{
								fontSize: 24,
								fontWeight: "500",
								color: "var(--text-body)",
								fontFamily: "var(--font-inter)",
							}}
						>
							(Taxable)
						</span>
					</p>
				</Box>
				<Box
					width={"100%"}
					sx={{ background: "lightgrey", height: 1.1 }}
					marginTop={2}
					marginBottom={2}
				/>
				{state.selectedCalculator === 0 && <CashMarginCalculator />}
				{state.selectedCalculator === 1 && <CreditMarginCalculator />}
				{state.selectedCalculator === 2 && <OnlineMarginCalculator />}
			</Card>
		</Card>
	);
}

export default React.memo(PriceCalculator);
