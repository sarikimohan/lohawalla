import AssetIndex from "@src/assets/AssetIndex";
import React, { useContext } from "react";
import FormikInput from "@src/Components/common/inputs/FormikInput";
import { useAddCategoryContext } from "../../AddCategoryForm";
import { Card, Checkbox } from "@mui/material";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";

function SecondPart() {
	const { state, creditActions, addCategoryActions, validate } =
		useAddCategoryContext();

	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="mb-3">
					<FormCardHeader heading="Credit Working" subheading="Enter" />
				</div>
				<Card variant="outlined" sx={{ padding: 2, marginBottom: 3 }}>
					<div className="rounded-md overflow-hidden">
						<table className="w-full border table-fixed">
							<thead
								className= "h-10 border-b border-slate-400"
								style={{ boxSizing: "border-box", background: '#EDEDFD' }}
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
										<p className="text-md font-semibold text-slate-500 ">
											Value
										</p>
									</th>
									<th className="w-2/12"></th>
								</tr>
							</thead>

							<tbody>
								{state.credit.map((v, i) => (
									<tr className="mb-2 border-b" key={v.id}>
										<td align="center">
											<p className="text-md font-bold text-slate-700 py-3">
												{v.days} days
											</p>
										</td>
										<td align="center">
											<Checkbox
												onChange={(e) => {
													creditActions.modityCreditType(e.target.checked, i);
												}}
											/>
										</td>
										<td align="center" className="w-2/5 py-3">
											<FieldInput
												type={"text"}
												placeHolder={"enter number"}
												{...v.value}
												onChange={(e) => {
													creditActions.modifyCreditValue(e.target.value, i);
												}}
												rightIcon={v.type === "numeric" ? "₹" : "%"}
											/>
										</td>
										<td align="center" className="w-fit">
											<div
												onClick={() => {
													creditActions.deleteCredit(i);
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
												<FieldInput
													{...state.creditInput.key}
													onChange={(e) =>
														creditActions.mutateState((p) => {
															p.creditInput.key.value = e.target.value;
														})
													}
													width={"85%"}
													type={"text"}
													placeHolder={"enter key"}
												/>
											</div>
											<div className="p-2 flex justify-center">
												<FieldInput
													{...state.creditInput.value}
													onChange={(e) =>
														creditActions.mutateState((p) => {
															p.creditInput.value.value = e.target.value;
														})
													}
													width={"85%"}
													type={"text"}
													placeHolder={"enter value"}
												/>
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="mt-5 flex justify-end">
						<AddMore
							handleAdd={() => {
								const verdict = validate.validateAddCredit();
								if (verdict) {
									creditActions.addCredit();
								}
							}}
						/>
					</div>
				</Card>
				<div className="mb-6">
					<div className="flex mb-2 ">
						<p className="text-md font-semibold text-slate-800 mr-2">
							Negotiation
						</p>
						<p className="text sm font-semibold text-slate-500">(in %)</p>
					</div>
					<FieldInput
						{...state.negotiation}
						onChange={(e) => {
							creditActions.mutateState((p) => {
								p.negotiation.value = e.target.value;
							});
						}}
						type={"number"}
						placeHolder={"Enter Negotiation"}
						name={"negotiation"}
					/>
				</div>
				<div className="crow jfe">
					<DefaultButton
						onClick={() => {
							const verdict = addCategoryActions.validateSecondForm();
							if (verdict) {
								addCategoryActions.mutateState((p) => p.page++);
							}
						}}
						label={"Next"}
						styles={NextButtonStyleConfig}
					/>
				</div>
			</Card>
		</>
	);
}

export default SecondPart;
