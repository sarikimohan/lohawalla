import { Grid } from "@mui/material";
import React from "react";

function OnlineMarginCalculator() {
	return (
		<>
			<Grid container justifyContent={"space-between"} marginBottom={2}>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-text-subtitle">Margin(Value)</p>
				</Grid>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fcolor-onyx">{324}</p>
				</Grid>
			</Grid>
			<Grid container justifyContent={"space-between"} marginBottom={2}>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-text-subtitle">Taxable Value</p>
				</Grid>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fcolor-onyx">{123}</p>
				</Grid>
			</Grid>
			<Grid container justifyContent={"space-between"} marginBottom={2}>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-text-subtitle">GST</p>
				</Grid>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fcolor-onyx">18%</p>
				</Grid>
			</Grid>
			<Grid container justifyContent={"space-between"}>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-text-body">NET TOTAL</p>
				</Grid>
				<Grid item xs={6} padding={"10px"}>
					<p className="body fw-bold fcolor-onyx">2131</p>
				</Grid>
			</Grid>
		</>
	);
}

export default OnlineMarginCalculator;
