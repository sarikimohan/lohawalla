import { Card, Checkbox } from "@mui/material";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";
import { Groups, useEditCompanyContext } from "../../EditCompany";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";

interface Props {}

export default function ThirdPart(props: Props) {
	const { state, setHandle, deleteHandle, stateUtils, addDesc } =
		useEditCompanyContext();

	return (
		<Card variant="outlined" sx={{ padding: 3 }}>
			<div className="mb-4">
				<FormCardHeader heading="Global Fields" subheading="Enter" />
			</div>
			<Card sx={{ padding: 3 }} variant="outlined">
				<div className="border rounded-md overflow-hidden">
					<table className="w-full table-auto">
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
									<p className="text-md font-semibold text-slate-500 ">Value</p>
								</th>
								<th className="w-fit"></th>
							</tr>
						</thead>

						<tbody>
							{state.descriptionLabels
								.map((v, i) => (
									<tr className="mb-2 border-b" key={v.id}>
										<td align="center">
											<p className="text-md font-bold text-slate-700 py-5">
												{v.key}
											</p>
										</td>
										<td align="center" className="w-2/5">
											<ValidatedEntry
												type={"text"}
												value={v.value}
												validateFunction={FieldDataService.clubValidators(
													Validators.validateNull
												)}
												onChange={(d) => {
													stateUtils.mutateState((p) => {
														p.descriptionLabels[i].value = d;
													});
												}}
												placeHolder={"enter value"}
												setHandle={setHandle(
													Groups.descEntry,
													"desc-entry-" + v.id
												)}
											/>
										</td>
										<td align="center">
											<div
												onClick={() => {
													deleteHandle(Groups.descEntry, "desc-entry-" + v.id);
													stateUtils.mutateState((p) => {
														p.descriptionLabels = p.descriptionLabels.filter(
															(d) => v.id !== d.id
														);
													});
												}}
											>
												<RotateAndScale>
													<AssetIndex.MinusCircleIcon />
												</RotateAndScale>
											</div>
										</td>
									</tr>
								))}
							<tr
								className="mb-2 border-b"
								style={{ borderTop: "5px solid transparent" }}
							>
								<td align="center" className="p-1">
									<div className="p-2">
										<ValidatedEntry
											width={"85%"}
											type={"text"}
											placeHolder={"enter key"}
											value={state.descriptionEntry.key}
											onChange={(d) => {
												stateUtils.mutateState((p) => {
													p.descriptionEntry.key = d;
												});
											}}
											validateFunction={FieldDataService.clubValidators(
												Validators.validateNull,
												(d) => {
													for (let i of state.descriptionLabels) {
														if (d.trim() === i.key)
															return d + " is already present";
													}
												}
											)}
											setHandle={setHandle(Groups.descEntry, "key")}
										/>
									</div>
								</td>
								<td align="center" className="p-1" colSpan={2}>
									<div className="p-2">
										<ValidatedEntry
											width={"85%"}
											type={"text"}
											placeHolder={"enter value"}
											value={state.descriptionEntry.value}
											onChange={(d) => {
												stateUtils.mutateState((p) => {
													p.descriptionEntry.value = d;
												});
											}}
											validateFunction={FieldDataService.clubValidators(
												Validators.validateNull
											)}
											setHandle={setHandle(Groups.descEntry, "value")}
										/>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="crow jfe mt-5">
					<AddMore
						handleAdd={() => {
							addDesc();
						}}
					/>
				</div>
			</Card>
		</Card>
	);
}
