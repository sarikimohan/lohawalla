import { Card, Checkbox } from "@mui/material";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";
import { useEditCategoryContext } from "../../EditCategory";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";

interface Props {}

export default function SecondPart(props: Props) {
	const {
		state,
		creditActions,
		setCreditHandle,
		editCategoryActions,
		validateAdd,
		setDescHandle
	} = useEditCategoryContext();

	return (
		<Card variant="outlined" sx={{ padding: 3 }}>
			<div className="mb-4">
				<FormCardHeader heading="Credit Working" subheading="Enter" />
			</div>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="rounded-md overflow-hidden">
					<table className="w-full border table-fixed">
						<thead
							className="bg-slate-100 h-10 border-b border-slate-400"
							style={{ boxSizing: "border-box" }}
						>
							<tr className="px-4 py-2">
								<th>
									<p className="text-md font-semibold text-slate-500">Days</p>
								</th>
								<th>
									<p className="text-md font-semibold text-slate-500">
										in rupees
									</p>
								</th>
								<th>
									<p className="text-md font-semibold text-slate-500 ">Value</p>
								</th>
								<th className="w-2/12"></th>
							</tr>
						</thead>

						<tbody>
							{state.credit.map((v, i) => (
								<tr className="mb-2 border-b" key={i}>
									<td align="center">
										<p className="text-md font-bold text-slate-700 py-3">
											{v.days} days
										</p>
									</td>
									<td align="center">
										<Checkbox
											checked={v.type === "numeric"}
											onChange={(e) => {
												editCategoryActions.mutateState((p) => {
													p.credit[i].type = e.target.checked
														? "numeric"
														: "percentage";
												});
											}}
										/>
									</td>
									<td align="center" className="w-2/5 py-3">
										<ValidatedEntry
											onChange={(d) => {
												editCategoryActions.mutateState((p) => {
													p.credit[i].value = d;
												});
											}}
											type={"text"}
											placeHolder={"enter number"}
											rightIcon={v.type === "numeric" ? "₹" : "%"}
											value={v.value}
											setHandle={setCreditHandle("credit-input-" + i)}
										/>
									</td>
									<td align="center" className="w-fit">
										<div
											onClick={() => {
												editCategoryActions.mutateState((p) => {
													p.credit = p.credit.filter((d) => d.id !== v.id);
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
								<td colSpan={4}>
									<div className="flex w-full justify-between">
										<div className="p-2 flex justify-center">
											<ValidatedEntry
												value={state.creditInput.key}
												onChange={(d) =>
													creditActions.mutateState((p) => {
														p.creditInput.key = d;
													})
												}
												width={"85%"}
												type={"text"}
												placeHolder={"enter key"}
												setHandle={setCreditHandle("credit-key")}
												validateFunction={FieldDataService.clubValidators(
													Validators.validateNull,
													Validators.validateInt,
													(d) => Validators.min(d, 0),
													(v) => {
														for (let d of state.credit) {
															if (v === d.days.toString()) {
																return v + " already present";
															}
														}
													}
												)}
											/>
										</div>
										<div className="p-2 flex justify-center">
											<ValidatedEntry
												value={state.creditInput.value}
												onChange={(d) =>
													creditActions.mutateState((p) => {
														p.creditInput.value = d;
													})
												}
												width={"85%"}
												type={"text"}
												placeHolder={"enter value"}
												setHandle={setCreditHandle("credit-value")}
												validateFunction={FieldDataService.clubValidators(
													Validators.validateNull,
													Validators.validateFloat,
													(d) => Validators.min(d, 0)
												)}
											/>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="flex justify-end mt-5">
					<AddMore
						handleAdd={() => {
							validateAdd();
						}}
					/>
				</div>
			</Card>
		</Card>
	);
}
