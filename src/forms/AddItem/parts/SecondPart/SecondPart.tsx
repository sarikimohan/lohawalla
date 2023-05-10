import { Card } from "@mui/material";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";

interface Props {}

export default function SecondPart(props: Props) {
	return (
		<Card variant="outlined" sx={{ padding: 3 }}>
			<div className="mb-4">
				<FormCardHeader heading="Margin Working" subheading="Enter" />
			</div>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<table className="w-full">
					<thead
						className="bg-slate-100 h-10 border-b border-slate-400"
						style={{ boxSizing: "border-box" }}
					>
						<tr className="px-4 py-2 rounded-md">
							<th style={{ borderTopLeftRadius: 8 }}>
								<p className="text-md font-semibold text-slate-500">Margin</p>
							</th>
							<th style={{ borderTopLeftRadius: 8 }}>
								<p className="text-md font-semibold text-slate-500 ">Amount</p>
							</th>
							<th className="w-fit"></th>
						</tr>
					</thead>
					<tbody>
						<tr className="mb-2 border-b">
							<td align="center">
								<p className="text-md font-bold text-slate-700 py-5">test</p>
							</td>
							<td align="center" className="w-2/5">
								<FieldInput
									isValid={false}
									error={undefined}
									data={""}
									onChange={(d) => {}}
									type={"number"}
									placeHolder={"enter value"}
								/>
							</td>
							<td align="center" className="w-fit">
								<div onClick={() => {}}>
									<RotateAndScale>
										<AssetIndex.MinusCircleIcon />
									</RotateAndScale>
								</div>
							</td>
						</tr>
						<tr>
							
						</tr>
					</tbody>
				</table>
			</Card>
		</Card>
	);
}
