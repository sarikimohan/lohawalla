import { Button, Card, Checkbox, Input } from "@mui/material";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";

interface Props {}

export default function SecondPart(props: Props) {
	return (
		<Card variant="outlined" sx={{ padding: 3 }}>
			<FormCardHeader heading="Price Structure" subheading="Enter" />
			<div>
				<table className="w-full">
					<thead
						className="bg-slate-100 h-10 border-b border-slate-400"
						style={{ boxSizing: "border-box" }}
					>
						<tr className="px-4 py-2">
							<th>
								<p className="text-md font-semibold text-slate-500">
									Description
								</p>
							</th>
							<th>
								<p className="text-md font-semibold text-slate-500">State</p>
							</th>
							<th>
								<p className="text-md font-semibold text-slate-500 ">Amount</p>
							</th>
							<th className="w-fit"></th>
						</tr>
					</thead>

					<tbody>
						<tr className="mb-2 border-b">
							<td align="center">
								<p className="text-md font-bold text-slate-700 py-5">
									+Basic Rate
								</p>
							</td>
							<td align="center">
								<Checkbox />
							</td>
							<td align="center" className="w-2/5">
								<Input sx={{ width: "80%" }} />
							</td>
							<td align="center" className="w-fit">
								<RotateAndScale>
									<AssetIndex.MinusCircleIcon />
								</RotateAndScale>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="mt-8">
				<Button
					onClick={() => {}}
					variant="outlined"
					sx={{ borderColor: "var(--iris)", minWidth: "max-content" }}
					startIcon={<AssetIndex.PlusIconBlue />}
				>
					<p className="button fcolor-iris">ADD MORE</p>
				</Button>
			</div>
		</Card>
	);
}
