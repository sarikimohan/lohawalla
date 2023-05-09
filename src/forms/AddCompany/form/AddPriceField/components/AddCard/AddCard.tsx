import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FormikInput from "@src/Components/common/inputs/FormikInput";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";

interface Props {
	width?: number;
	position?: number;
	names: {
		descriptionName: string;
		typeName: string;
		valueName: string;
	};
}

export default function AddCard(props: Props) {
	return (
		<Card variant="outlined" sx={{ padding: 2, width: props.width }}>
			<div className="flex justify-between">
				<p className="body text-slate-400 font-medium mb-3">Add</p>
				<div>
					<RotateAndScale>
						<AssetIndex.MinusCircleIcon />
					</RotateAndScale>
				</div>
			</div>
			<table className="table-fixed w-full">
				<thead className="border-b border-slate-400">
					<tr>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<p className="bold p-3 pl-6">Description</p>
						</td>
						<td>
							<FormikInput name={""} />
						</td>
					</tr>
					<tr>
						<td>
							<p className="bold p-3 pl-6">Type</p>
						</td>
						<td>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">
									enter type
								</InputLabel>
								<Select<PercNum>
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={"percentage"}
									label="enter type"
									onChange={() => {}}
								>
									<MenuItem value={"percentage"}>percentage</MenuItem>
									<MenuItem value={"numeric"}>numeric</MenuItem>
								</Select>
							</FormControl>
						</td>
					</tr>
					<tr>
						<td>
							<p className="bold p-3 pl-6">Value</p>
						</td>
						<td>
							<FormikInput name={""} />
						</td>
					</tr>
				</tbody>
			</table>
		</Card>
	);
}
