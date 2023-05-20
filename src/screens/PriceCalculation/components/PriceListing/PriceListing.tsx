import React from "react";
import { Card, Box } from "@mui/material";
import AssetIndex from "@src/assets/AssetIndex";

interface Props {
	priceList: PriceCalculation.PriceFields[];
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
			<table className="table-fixed w-full border rounded-sm border-slate-100">
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
							className="text-slate-400 border-b-2 border-b-slate-300 pb-1 pl-3 p-2 rounded-sm"
						>
							Price (Rs)
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						{props.priceList.map((v, i) => (
							<tr>
								<td>
									<Box padding={"10px"}>
										<p className="body fcolor-text-body">{v.name}</p>
									</Box>
								</td>
								<td>
									<Box padding={"10px"}>
										<p className="body fcolor-onyx">{v.value} </p>
									</Box>
								</td>
							</tr>
						))}
					</tr>
				</tbody>
			</table>
		</Card>
	);
}
