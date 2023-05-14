import { Card } from "@mui/material";
import SaveButton from "@src/Components/common/buttons/SaveButton/SaveButton";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import React from "react";
import { useAddCategoryContext } from "../../AddCategoryForm";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";
import { verify } from "crypto";
import { useAuthGuardContext } from "@src/auth/AuthGuard/AuthGuard";

function ThirdPart() {
	const {
		state,
		descriptionActions,
		addCategoryActions,
		saveActions,
		validate,
		refresh,
		onClose,
	} = useAddCategoryContext();
	const { user } = useAuthGuardContext();

	return (
		<Card variant="outlined" sx={{ padding: 3 }}>
			<>
				<div className="mb-6">
					<FormCardHeader heading="Global Fields" subheading="Enter" />
					<Card variant="outlined" sx={{ padding: 2, marginBottom: 3 }}>
						<div className="rounded-md overflow-hidden">
							<table className="w-full border table-fixed">
								<thead
									className="bg-slate-100 h-10 border-b border-slate-400"
									style={{ boxSizing: "border-box" }}
								>
									<tr className="px-4 py-2">
										<th>
											<p className="text-md font-semibold text-slate-500">
												Key
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
									{state.descriptionLabels.map((v, i) => (
										<tr className="mb-2 border-b" key={v.id}>
											<td align="center">
												<p className="text-md font-bold text-slate-700 py-3">
													{v.key}
												</p>
											</td>
											<td align="center" className="py-3">
												<FieldInput
													{...v.value}
													onChange={(d) =>
														descriptionActions.updateField(d.target.value, i)
													}
													type={"text"}
													placeHolder={"enter number"}
												/>
											</td>
											<td align="center" className="w-fit">
												<div
													onClick={() => {
														descriptionActions.deleteField(i);
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
										<td colSpan={3}>
											<div className="flex w-full justify-between">
												<div className="p-2 flex justify-center">
													<FieldInput
														{...state.descriptionEntry.key}
														width={"85%"}
														type={"text"}
														placeHolder={"enter key"}
														onChange={(d) =>
															descriptionActions.setAddKey(d.target.value)
														}
													/>
												</div>
												<div className="p-2 flex justify-center">
													<FieldInput
														{...state.descriptionEntry.value}
														onChange={(d) =>
															descriptionActions.setAddValue(d.target.value)
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
									const verdict = validate.validateAddDescription();
									if (verdict) descriptionActions.addField();
								}}
							/>
						</div>
					</Card>
				</div>
				<div className="crow jfe">
					<SaveButton
						onClick={() => {
							validate.validateDescriptionLabels(() => {
								saveActions.save([], user).then(() => {
									refresh();
									onClose();
								});
							});
						}}
						isLoading={state.loading["save"].status === "initialized"}
					>
						Save
					</SaveButton>
				</div>
			</>
		</Card>
	);
}

export default ThirdPart;
