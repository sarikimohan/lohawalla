import { Box, Card, Grid, Input, Slider } from "@mui/material";
import getRoundedVal, {
	getRoundedNumber,
} from "@src/modules/Utils/getRoundedVal";
import useWidth from "@src/modules/hooks/useWidth";
import { useCalculationContext } from "@src/screens/PriceCalculation/PriceCalculation";
import GrouppedButton from "@src/screens/PriceCalculation/components/GrouppedButton/GrouppedButton";
import React from "react";

function CreditMarginCalculator() {
	const widthHandle = useWidth();
	const { state, creditCalcActions } = useCalculationContext();

	return (
		<div>
			<Box>
				<div ref={widthHandle.ref}>
					<Box paddingBottom={"13px"} marginBottom={2}>
						<div style={{ width: widthHandle.width, overflow: "auto" }}>
							<GrouppedButton
								labels={state.calculationData.creditMargin.map(
									(v) => v.days + " days"
								)}
								currentSelected={state.creditCalculator.selectedDays}
								setCurrentSelected={function (index: number): void {
									creditCalcActions.setSelectedDate(index);
								}}
							/>
						</div>
					</Box>
				</div>
				<Box display={"flex"} justifyContent="space-between">
					<Box>
						<p className="small fcolor-body">
							{state.creditCalculator.startValue}
						</p>
					</Box>
					<Box>
						<p className="small fcolor-body">
							{state.creditCalculator.endValue}
						</p>
					</Box>
				</Box>
				<Box marginBottom={2}>
					<Slider
						aria-label="Temperature"
						valueLabelDisplay="auto"
						step={
							(state.creditCalculator.endValue -
								state.creditCalculator.startValue) /
							10
								? (state.creditCalculator.endValue -
										state.creditCalculator.startValue) /
								  10
								: 10
						}
						marks
						min={Math.round(state.creditCalculator.startValue)}
						max={state.creditCalculator.endValue}
						value={state.creditCalculator.currentValue}
					/>
				</Box>
				<Grid container justifyContent={"space-between"} marginBottom={2}>
					<Grid item xs={6} padding={"10px"} alignItems="center">
						<p className="body fcolor-onyx">Net Margin</p>
					</Grid>
					<Grid item xs={6} padding={"10px"}>
						<Input value={state.creditCalculator.netMarginInput.value} />
						{state.creditCalculator.netMarginInput.error && (
							<p
								style={{
									fontSize: 10,
									color: "red",
									marginTop: 2,
									fontFamily: "var(--font-inter)",
								}}
							>
								{state.creditCalculator.netMarginInput.error}
							</p>
						)}
					</Grid>
				</Grid>
				<Grid container justifyContent={"space-between"} marginBottom={2}>
					<Grid item xs={6} padding={"10px"}>
						<p className="body fw-bold fcolor-text-subtitle">Taxable Value</p>
					</Grid>
					<Grid item xs={6} padding={"10px"}>
						<p className="body fcolor-onyx">
							{getRoundedNumber(state.creditCalculator.taxableValue)}
						</p>
					</Grid>
				</Grid>
				<Grid container justifyContent={"space-between"} marginBottom={2}>
					<Grid item xs={6} padding={"10px"}>
						<p className="body fw-bold fcolor-text-subtitle">GST</p>
					</Grid>
					<Grid item xs={6} padding={"10px"}>
						<p className="body fcolor-onyx">
							{state.calculationData.GST.value}
							{state.calculationData.GST.type === "percentage" ? "%" : "rs"}
						</p>
					</Grid>
				</Grid>
				<Box
					width={"100%"}
					sx={{ background: "lightgrey", height: 1.1 }}
					marginTop={2}
					marginBottom={2}
				/>
				<Grid container justifyContent={"space-between"}>
					<Grid item xs={6} padding={"10px"}>
						<p className="body fw-bold fcolor-text-body">NET TOTAL</p>
					</Grid>
					<Grid item xs={6} padding={"10px"}>
						<p className="body fw-bold fcolor-onyx">
							{state.creditCalculator.netTotal}
						</p>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default CreditMarginCalculator;
