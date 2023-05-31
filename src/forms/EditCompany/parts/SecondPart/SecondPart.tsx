import { Alert, Button, Card, Checkbox, Input } from "@mui/material";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React, { useState } from "react";
import AddPriceField from "../../form/AddPriceField/AddPriceField";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import Attention from "@src/Components/feedback/Alerts/Attention";
import Tip from "@src/Components/feedback/Tooltip/Tip";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { Groups, useEditCompanyContext } from "../../EditCompany";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";

interface Props {}

export default function SecondPart(props: Props) {
	const { setHandle, state, stateUtils } = useEditCompanyContext();
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
							</tr>
						</thead>

						<tbody>
							{state.priceStructure.map((v, i) => (
								<tr className="mb-2 border-b">
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
										<Checkbox checked={v.isFixed} />
									</td>
									<td align="center" className="w-2/5 py-3">
										<ValidatedEntry
											type={"number"}
											placeHolder={"enter value"}
											value={v.value}
											onChange={(d) => {
												stateUtils.mutateState((p) => {
													p.priceStructure[i].value = d;
												});
											}}
											validateFunction={FieldDataService.clubValidators(
												Validators.validateNull,
												Validators.validateFloat,
												(d) => {
													if (v.type === "percentage") {
														return Validators.max(d, 100);
													}
												},
												(d) => Validators.min(d, 0)
											)}
											setHandle={setHandle(Groups.priceField, "pf" + v._id)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="mt-4 jfe">
						<AddMore handleAdd={() => {}} />
					</div>
				</div>
			</Card>
			{showAddForm && (
				<AddPriceField
					close={function (): void {
						setShowAddForm(false);
					}}
				/>
			)}
		</>
	);
}
