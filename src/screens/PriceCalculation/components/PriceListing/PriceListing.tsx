import React, { useState } from "react";
import { Card, Box } from "@mui/material";
import AssetIndex from "@src/assets/AssetIndex";
import PriceCalculation from "../../PriceCalculation";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

interface Props {
	priceList: { name: string; value: string }[];
	total: string;
}

export default function PriceListing(props: Props) {
	return (
		<Card
			variant="outlined"
			sx={{ borderRadius: 12 / 8, padding: "24px 32px", width: "100%" }}
		>
			<div className="flex items-center mb-4">
				<div className="mr-4">
					<p className="text-[24px] text-fuschia font-medium">
						Price structure
					</p>
				</div>
				<div>
					<AssetIndex.PriceTag />
				</div>
			</div>
			<table className="table-fixed w-full border rounded-sm border-slate-100 mb-3">
				<thead>
					<tr>
						<th
							align="left"
							className="text-slate-400 border-b-2 border-b-slate-300 pb-1 pl-3 p-2 rounded-sm"
						>
							data
						</th>
						<th
							align="left"
							className="text-slate-400 border-b-2 border-b-slate-300 pb-1 p-2 rounded-sm pl-[150px]"
						>
							Price (Rs)
						</th>
					</tr>
				</thead>
				<tbody>
					{props.priceList.map((v, i) => (
						<tr>
							<td>
								<Box padding={"10px"}>
									<p className="body fcolor-text-body">{v.name}</p>
								</Box>
							</td>
							<td align="left" className="pl-[140px]">
								<Box padding={"10px"}>
									<p className="body fcolor-onyx w-fit">{v.value} </p>
								</Box>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="border-b-2 border-b-slate-300 w-full h-1"></div>
			<Box
				display={"flex"}
				justifyContent="space-between"
				alignItems={"center"}
				paddingRight={2}
			>
				<Box padding={"10px"} display="flex">
					<p className="bold fcolor-text-onyx" style={{ marginRight: 3 }}>
						Total
					</p>
					<p className="body fcolor-text-subtitle">(Without tax and margin)</p>
				</Box>
				<Box padding={"10px"}>
					<p className="bold fcolor-onyx text-[20px]">Rs {props.total}</p>
				</Box>
			</Box>
		</Card>
	);
}
