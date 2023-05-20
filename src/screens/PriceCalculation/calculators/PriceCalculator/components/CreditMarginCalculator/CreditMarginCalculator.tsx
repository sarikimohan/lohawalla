import { Box, Card, Grid, Input, Slider } from "@mui/material";
import useWidth from "@src/modules/hooks/useWidth";
import GrouppedButton from "@src/screens/PriceCalculation/components/GrouppedButton/GrouppedButton";
import React from "react";

function CreditMarginCalculator() {
	const widthHandle = useWidth();
	return (
		<div>
			<Box>
				<div ref={widthHandle.ref}>
					<Box paddingBottom={"13px"} marginBottom={2}>
						<div style={{ width: widthHandle.width, overflow: "auto" }}>
							<GrouppedButton
								labels={["2 days", "5 days", "7 days", "9 days", "12 days"]}
								currentSelected={0}
								setCurrentSelected={function (index: number): void {}}
							/>
						</div>
					</Box>
				</div>
				<Box display={"flex"} justifyContent="space-between">
					<Box>
						<p className="small fcolor-body">0</p>
					</Box>
					<Box>
						<p className="small fcolor-body">100</p>
					</Box>
				</Box>
				<Box marginBottom={2}>
					<Slider
						aria-label="Temperature"
						valueLabelDisplay="auto"
						step={10}
						marks
						min={0}
						max={100}
					/>
				</Box>
				<Grid container justifyContent={"space-between"} marginBottom={2}>
					<Grid item xs={6} padding={"10px"} alignItems="center">
						<p className="body fcolor-onyx">Net Margin</p>
					</Grid>
					<Grid item xs={6} padding={"10px"}>
						<Input />
						{false && (
							<p
								style={{
									fontSize: 10,
									color: "red",
									marginTop: 2,
									fontFamily: "var(--font-inter)",
								}}
							>
								{/* {creditCalculator.getNetMarginInput().err.errorMessage} */}
							</p>
						)}
					</Grid>
				</Grid>
				<Grid container justifyContent={"space-between"} marginBottom={2}>
					<Grid item xs={6} padding={"10px"}>
						<p className="body fw-bold fcolor-text-subtitle">Taxable Value</p>
					</Grid>
					<Grid item xs={6} padding={"10px"}>
						<p className="body fcolor-onyx">1223</p>
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
						<p className="body fw-bold fcolor-onyx">1123</p>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default CreditMarginCalculator;
