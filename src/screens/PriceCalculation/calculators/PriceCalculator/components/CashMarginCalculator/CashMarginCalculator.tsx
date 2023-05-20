import { Box, Grid, Input, LinearProgress, Slider } from "@mui/material";
import { useCalculationContext } from "@src/screens/PriceCalculation/PriceCalculation";
import React, { useContext } from "react";

function CashMarginCalculator() {
	const { cashCalcActions } = useCalculationContext();
	console.log(
		cashCalcActions.getSliderRange().end -
			cashCalcActions.getSliderRange().start
	);
	return ((
		startValue = cashCalcActions.getSliderRange().start,
		endValue = cashCalcActions.getSliderRange().end,
		currentValue = cashCalcActions.getCurrentSliderValue(),
		negoInputVal = cashCalcActions.getInput(),
		gst = cashCalcActions.getGSTValue(),
		netTotal = cashCalcActions.getNetTotal(),
		taxable = cashCalcActions.getTaxableValue(),
		setNetMargin = (d: string) => cashCalcActions.setNetMargin(d),
		setCurrentValue = (d: number) => cashCalcActions.setCurrentSliderValue(d)
	) => (
		<div>
			<Box marginBottom={1}>
				<p className="small fcolor-text-subtitle">Select Margin</p>
			</Box>
			<Box display={"flex"} justifyContent="space-between">
				<Box>
					<p className="small fcolor-body">{startValue.toFixed(2)}</p>
				</Box>
				<Box>
					<p className="small fcolor-body">{endValue.toFixed(2)}</p>
				</Box>
			</Box>
			<Box marginBottom={2} marginTop={1}>
				<Slider
					aria-label="Temperature"
					valueLabelDisplay="auto"
					step={
						(endValue - startValue) / 10 ? (endValue - startValue) / 10 : 10
					}
					marks
					min={startValue}
					max={endValue}
					value={currentValue}
					onChange={(v, e) => {
						setCurrentValue(e as number);
					}}
				/>
			</Box>
			<Grid container justifyContent={"space-between"} marginBottom={2}>
				<Grid item xs={6} padding={"10px"} alignItems="center">
					<p className="body fcolor-onyx">Net Margin</p>
				</Grid>
				<Grid item xs={6} padding={"10px"}>
					<Input
						value={negoInputVal.value}
						onChange={(e) => setNetMargin(e.target.value)}
					/>
					{negoInputVal.error && (
						<p
							style={{
								fontSize: 10,
								color: "red",
								marginTop: 2,
								fontFamily: "var(--font-inter)",
							}}
						>
							{negoInputVal.error}
						</p>
					)}
				</Grid>
			</Grid>
			<Grid container justifyContent={"space-between"} marginBottom={2}>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-text-subtitle">Taxable Value</p>
				</Grid>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fcolor-onyx">{taxable}</p>
				</Grid>
			</Grid>
			<Grid container justifyContent={"space-between"} marginBottom={2}>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-text-subtitle">GST</p>
				</Grid>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fcolor-onyx">{gst}</p>
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
					<p className="body fw-bold fcolor-onyx">{netTotal.toFixed(2)}</p>
				</Grid>
			</Grid>
		</div>
	))();
}

export default React.memo(CashMarginCalculator);
