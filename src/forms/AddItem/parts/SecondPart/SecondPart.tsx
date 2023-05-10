import { Card, Tooltip } from "@mui/material";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";
import { useAddItemContext } from "../../AddItem";
import Tip from "@src/Components/feedback/Tooltip/Tip";

interface Props {}

export default function SecondPart(props: Props) {
	const { secondFormActions, state } = useAddItemContext();
	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="mb-4">
					<FormCardHeader heading="Margin Working" subheading="Enter" />
				</div>
				<Card variant="outlined" sx={{ padding: 3 }}>
					<div className="mb-4">
						<p className="text-md font-bold">Margin</p>
					</div>
					<table className="w-full table-fixed">
						<thead
							className="bg-slate-100 h-10 border-b border-slate-400"
							style={{ boxSizing: "border-box" }}
						>
							<tr className="px-4 py-2 rounded-md">
								<th style={{ borderTopLeftRadius: 8 }}>
									<p className="text-md font-semibold text-slate-500">
										Time (Day)
									</p>
								</th>
								<th style={{ borderTopRightRadius: 8 }}>
									<p className="text-md font-semibold text-slate-500 ">
										Percentage
									</p>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="mb-2 border-b">
								<td align="center">
									<Tip title={"enter values in percentage"}>
										<p className="text-md font-bold text-slate-700	py-4">
											Online
										</p>
									</Tip>
								</td>
								<td align="center" className="">
									<FieldInput
										width={"80%"}
										isValid={state.margin.online.isValid}
										error={state.margin.online.error}
										data={state.margin.online.value}
										onChange={(d) => {
											secondFormActions.setOnline(d.target.value);
										}}
										type={"number"}
										placeHolder={"enter value"}
									/>
								</td>
							</tr>
							<tr className="mb-2 border-b">
								<td align="center">
									<Tip title={"enter values in percentage"}>
										<p className="text-md font-bold text-slate-700 py-5">
											Cash
										</p>
									</Tip>
								</td>
								<td align="center">
									<FieldInput
										width={"80%"}
										isValid={state.margin.cash.isValid}
										error={state.margin.cash.error}
										data={state.margin.cash.value}
										onChange={(d) => {
											secondFormActions.setCash(d.target.value);
										}}
										type={"number"}
										placeHolder={"enter value"}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</Card>
			</Card>
			<div className="crow jfe mt-8">
				<DefaultButton
					onClick={function () {
						const verdict = secondFormActions.validate();
						if (verdict) {
							secondFormActions.mutateState((p) => p.page++);
						}
					}}
					label={"Next"}
					styles={NextButtonStyleConfig}
				/>
			</div>
		</>
	);
}
