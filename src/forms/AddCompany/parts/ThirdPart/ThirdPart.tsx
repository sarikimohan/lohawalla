import { Card, Checkbox } from "@mui/material";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";
import { useAddCompanyContext } from "../../AddCompany";
import ScaleOnHover from "@src/Components/interactions/ScaleOnHover/ScaleOnHover";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";

interface Props {}

export default function ThirdPart(props: Props) {
	const { state, thirdFormActions, saveFormActions } = useAddCompanyContext();

	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="mb-4">
					<FormCardHeader heading="Global Fields" subheading="Enter" />
				</div>
				<Card sx={{ padding: 3 }} variant="outlined">
					<div className="border rounded-md overflow-hidden">
						<table className="w-full">
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
										<p className="text-md font-semibold text-slate-500 ">
											Value
										</p>
									</th>
									<th className="w-fit"></th>
								</tr>
							</thead>

							<tbody>
								{state.descriptionLabels.map((v, i) => (
									<tr className="mb-2 border-b" key={v.id}>
										<td align="center">
											<p className="text-md font-bold text-slate-700 py-5">
												{v.key}
											</p>
										</td>
										<td align="center" className="w-2/5">
											<FieldInput
												isValid={v.value.isValid}
												error={v.value.error}
												data={v.value.value}
												onChange={(d) => {
													thirdFormActions.updateField(d.target.value, i);
												}}
												type={"text"}
												placeHolder={"enter value"}
											/>
										</td>
										<td align="center" className="w-fit">
											<div
												onClick={() => {
													thirdFormActions.deleteField(i);
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
											<FieldInput
												width={"85%"}
												isValid={state.descriptionEntry.key.isValid}
												error={state.descriptionEntry.key.error}
												data={state.descriptionEntry.key.value}
												onChange={(d) => {
													thirdFormActions.setAddKey(d.target.value);
												}}
												type={"text"}
												placeHolder={"enter key"}
											/>
										</div>
									</td>
									<td align="center" className="p-1" colSpan={2}>
										<div className="p-2">
											<FieldInput
												width={"85%"}
												isValid={state.descriptionEntry.value.isValid}
												error={state.descriptionEntry.value.error}
												data={state.descriptionEntry.value.value}
												onChange={(d) => {
													thirdFormActions.setAddValue(d.target.value);
												}}
												type={"text"}
												placeHolder={"enter value"}
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
								const verdict = thirdFormActions.validateAdd();
								if (verdict) thirdFormActions.addField();
							}}
						/>
					</div>
				</Card>
			</Card>
			<div className="mt-8">
				<DefaultButton
					onClick={function () {
						saveFormActions.saveForm([], {
							name: "snehal",
							id: "645c049dd924bdde2e265995",
						});
					}}
					label={"Save"}
					styles={NextButtonStyleConfig}
					loading={state.loading.savedData.status === "initialized"}
					loadingColor={"#fff"}
				/>
			</div>
		</>
	);
}
