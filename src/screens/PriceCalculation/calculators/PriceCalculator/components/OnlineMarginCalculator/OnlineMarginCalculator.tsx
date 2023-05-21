import { Grid } from "@mui/material";
import { useCalculationContext } from "@src/screens/PriceCalculation/PriceCalculation";
import React from "react";

function OnlineMarginCalculator() {
	const { state } = useCalculationContext();
	return (
		<>
			<Grid container justifyContent={"space-between"} marginBottom={2}>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-text-subtitle">Margin(Value)</p>
				</Grid>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fcolor-onyx">
						{state.onlineCalculator.marginValue}
					</p>
				</Grid>
			</Grid>
			<Grid container justifyContent={"space-between"} marginBottom={2}>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-text-subtitle">Taxable Value</p>
				</Grid>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fcolor-onyx">
						{state.onlineCalculator.taxableValue}
					</p>
				</Grid>
			</Grid>
			<Grid container justifyContent={"space-between"} marginBottom={2}>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-text-subtitle">GST</p>
				</Grid>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fcolor-onyx">{state.onlineCalculator.gst}</p>
				</Grid>
			</Grid>
			<Grid container justifyContent={"space-between"}>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-text-body">NET TOTAL</p>
				</Grid>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-onyx">
						{state.onlineCalculator.netTotal}
					</p>
				</Grid>
			</Grid>
		</>
	);
}

export default OnlineMarginCalculator;
