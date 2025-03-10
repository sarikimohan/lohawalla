import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FormikInput from "@src/Components/common/inputs/FormikInput";
import Input from "@src/Components/common/inputs/Input";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";

interface Props {
	width?: number;
	position?: number;
	descName: string;
	data: EditCompany.NewPriceField;
	onDelete?: () => void;
	onChangeType: (d: PercNum) => void;
	onChangeOperation: (d: OpType) => void;
	onChange: (d: string) => void;
}

export default function AddCard(props: Props) {
	const { onDelete, data } = props;

	return (
		<Card variant="outlined" sx={{ padding: 2, width: props.width }}>
			<div className="flex justify-between">
				<p className="body text-slate-400 font-medium mb-3">
					Add {props.data.name.value}
				</p>
				<div onClick={() => onDelete && onDelete()}>
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
							<div className="p-3">
								<FieldInput
									isValid={data.name.isValid}
									error={data.name.error}
									data={data.name.value}
									onChange={(e) => props.onChange(e.target.value)}
									type={"text"}
									placeHolder={"name of price field"}
								/>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<p className="bold p-3 pl-6">Type</p>
						</td>
						<td>
							<div className="p-3">
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">type</InputLabel>
									<Select<PercNum>
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={props.data.type}
										label="enter type"
										onChange={(e) => {
											props.onChangeType(e.target.value as PercNum);
										}}
									>
										<MenuItem value={"percentage"}>percentage</MenuItem>
										<MenuItem value={"numeric"}>numeric</MenuItem>
									</Select>
								</FormControl>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<p className="bold p-3 pl-6">Operation</p>
						</td>
						<td>
							<div className="p-3">
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">
										operation
									</InputLabel>
									<Select<OpType>
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={props.data.operation}
										label="enter type"
										onChange={(e) => {
											props.onChangeOperation(e.target.value as OpType);
										}}
									>
										<MenuItem value={"add"}>add</MenuItem>
										<MenuItem value={"subtract"}>subtract</MenuItem>
									</Select>
								</FormControl>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</Card>
	);
}
