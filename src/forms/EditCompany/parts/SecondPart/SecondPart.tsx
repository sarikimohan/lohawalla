import { Card, Checkbox } from "@mui/material";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React, { useState } from "react";
import AddPriceField from "../../form/AddPriceField/AddPriceField";
import Attention from "@src/Components/feedback/Alerts/Attention";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { Groups, useEditCompanyContext } from "../../EditCompany";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";
import { nanoid } from "nanoid";

interface Props {}

export default function SecondPart(props: Props) {
	const { setHandle, state, stateUtils, deleteHandle } =
		useEditCompanyContext();
	const [showAddForm, setShowAddForm] = useState(false);

	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<FormCardHeader heading="Price Structure" subheading="Enter" />
				<div className="my-3">
					<Attention severity="warning">
						+ basic rate is a special price field
					</Attention>
				</div>
				<div className="rounded-md overflow-hidden">
					<table className="w-full border">
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
									<p className="text-md font-semibold text-slate-500 ">
										Amount
									</p>
								</th>
								<th className="w-[40px]"></th>
							</tr>
						</thead>

						<tbody>
							{state.priceStructure.map((v, i) => (
								<tr className="mb-2 border-b" key={v._id}>
									<td align="center">
										<p className="text-md font-bold text-slate-700 py-3">
											<span
												className={
													v.operation === "add"
														? "text-green-500"
														: "text-red-500"
												}
											>
												{v.operation === "add" ? "+" : "-"}
												{v.name} {v.type === "numeric" ? "₹" : "%"}
											</span>
										</p>
									</td>
									<td align="center">
										{v.name === "basic rate" ? (
											<></>
										) : (
											<Checkbox
												checked={v.isFixed}
												onChange={(e) => {
													stateUtils.mutateState((p) => {
														p.priceStructure[i].isFixed = e.target.checked;
														if (!e.target.checked) {
															p.priceStructure[i].value = "";
														}
													});
												}}
											/>
										)}
									</td>
									<td align="center" className="w-2/5 py-3">
										<ValidatedEntry
											disabled={!v.isFixed}
											type={"number"}
											placeHolder={"enter value"}
											value={v.value}
											onChange={(d) => {
												stateUtils.mutateState((p) => {
													p.priceStructure[i].value = d;
												});
											}}
											validateFunction={
												v.isFixed
													? FieldDataService.clubValidators(
															Validators.validateNull,
															Validators.validateFloat,
															(d) => {
																if (v.type === "percentage") {
																	return Validators.max(d, 100);
																}
															},
															(d) => Validators.min(d, 0)
													  )
													: undefined
											}
											setHandle={setHandle(Groups.priceField, "pf" + v._id)}
										/>
									</td>
									<td align="center" className="w-[40px]">
										<div
											onClick={() => {
												stateUtils.mutateState((p) => {
													if (p.priceStructure[i].wasAdded === undefined) {
														p.deletedId.push(p.priceStructure[i]._id);
													}
													p.priceStructure = p.priceStructure.filter(
														(v, k) => k !== i
													);
													deleteHandle(Groups.priceField, "pf" + v._id);
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
						</tbody>
					</table>
					<div className="mt-4 jfe">
						<AddMore
							handleAdd={() => {
								setShowAddForm(true);
							}}
						/>
					</div>
				</div>
			</Card>
			{showAddForm && (
				<AddPriceField
					close={function (): void {
						setShowAddForm(false);
					}}
					data={state.tempPriceFields}
					onChangeType={function (d: PercNum, i: number): void {
						stateUtils.mutateState((p) => {
							p.tempPriceFields[i].type = d;
						});
					}}
					onChangeOperation={function (d: OpType, i: number): void {
						stateUtils.mutateState((p) => {
							p.tempPriceFields[i].operation = d;
						});
					}}
					onChange={function (d: string, i: number): void {
						stateUtils.mutateState((p) => {
							p.tempPriceFields[i].name.value = d;
						});
					}}
					addPriceField={() => {
						stateUtils.mutateState((p) => {
							p.tempPriceFields.push({
								id: nanoid(),
								name: { value: "" },
								operation: "add",
								type: "percentage",
							});
						});
					}}
					onSave={() => {
						// validate
						const verdict = { isValid: true };
						const obj: Record<string, boolean> = {};
						stateUtils.mutateState((p) => {
							for (let pf of p.priceStructure) {
								obj[pf.name.trim()] = true;
							}

							for (let i = 0; i < p.tempPriceFields.length; ++i) {
								const tpf = p.tempPriceFields[i];
								tpf.name.error = FieldDataService.registerValidator(
									tpf.name.value,
									verdict,
									Validators.validateNull,
									(d) => {
										if (obj[d.trim()]) return d + " already exists";
										else obj[d.trim()] = true;
									}
								);
							}
							// save
							if (verdict.isValid) {
								for (let i = 0; i < p.tempPriceFields.length; ++i) {
									const tpf = p.tempPriceFields[i];
									if (tpf.name.value === "basic rate") {
										p.priceStructure.unshift({
											_id: tpf.id,
											name: tpf.name.value,
											value: "0",
											isFixed: true,
											type: "numeric",
											operation: "add",
											wasAdded: true,
										});
									} else {
										p.priceStructure.push({
											_id: tpf.id,
											name: tpf.name.value,
											value: "",
											isFixed: false,
											type: tpf.type,
											operation: tpf.operation,
											wasAdded: true,
										});
									}
								}
								p.tempPriceFields = [
									{
										id: nanoid(),
										name: { value: "" },
										type: "percentage",
										operation: "add",
									},
								];
								setShowAddForm(false);
							}
						});
					}}
					deletePriceField={(i) => {
						stateUtils.mutateState((p) => {
							p.tempPriceFields = p.tempPriceFields.filter((v, k) => k !== i);
						});
					}}
				/>
			)}
		</>
	);
}
