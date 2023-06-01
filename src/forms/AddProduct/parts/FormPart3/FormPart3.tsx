import { Card } from "@mui/material";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";
import { useAddProductContext } from "../../AddProductForm";
import { nanoid } from "nanoid";
import { useAuthGuardContext } from "@src/auth/AuthGuard/AuthGuard";

interface Props {}

export default function FormPart3(props: Props) {
	const {
		validate,
		addProductActions,
		secondFormActions,
		descriptionActions,
		state,
	} = useAddProductContext();
	const { user } = useAuthGuardContext();
	console.log(state.loading.save);
	return (
		<Card variant="outlined" sx={{ padding: 3 }}>
			<div className="mb-4">
				<FormCardHeader heading="Description" />
			</div>
			<div className="mb-4">
				<DefaultFormLabel className="mb-2">Description</DefaultFormLabel>
				<FieldTextArea
					{...state.thirdForm.description}
					onChange={(d) => {
						addProductActions.mutateState((p) => {
							p.thirdForm.description.value = d.target.value;
						});
					}}
					height={120}
					placeHolder={"enter description"}
				/>
			</div>

			<DefaultFormLabel className="mb-2">Description Labels</DefaultFormLabel>
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
									<p className="text-md font-semibold text-slate-500 ">Value</p>
								</th>
								<th className="w-fit"></th>
							</tr>
						</thead>

						<tbody>
							{state.thirdForm.descriptionLabels.map((v, i) => (
								<tr className="mb-2 border-b" key={v.id}>
									<td align="center">
										<p className="text-md font-bold text-slate-700 py-5">
											{v.key}
										</p>
									</td>
									<td align="center" className="w-2/5">
										<FieldInput
											{...v.value}
											onChange={(e) => {
												descriptionActions.updateField(e.target.value, i);
											}}
											type={"text"}
											placeHolder={"enter value"}
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
								<td align="center" className="p-1">
									<div className="p-2">
										<FieldInput
											{...state.thirdForm.descriptionEntry.key}
											onChange={(d) => {
												descriptionActions.setAddKey(d.target.value);
											}}
											width={"85%"}
											type={"text"}
											placeHolder={"enter key"}
										/>
									</div>
								</td>
								<td align="center" className="p-1" colSpan={2}>
									<div className="p-2">
										<FieldInput
											{...state.thirdForm.descriptionEntry.value}
											onChange={(d) => {
												descriptionActions.setAddValue(d.target.value);
											}}
											width={"85%"}
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
							const verdict = validate.validateAddDescription();
							if (verdict) {
								addProductActions.mutateState((p) => {
									p.thirdForm.descriptionLabels.push({
										id: nanoid(),
										key: p.thirdForm.descriptionEntry.key.value.trim(),
										value: {
											value: p.thirdForm.descriptionEntry.value.value.trim(),
										},
									});
									p.thirdForm.descriptionEntry.value.value = "";
									p.thirdForm.descriptionEntry.key.value = "";
								});
							}
						}}
					/>
				</div>
			</Card>
			<div className="mt-5 flex justify-end">
				<DefaultButton
					onClick={function (): void {
						const v1 = validate.validateDescriptionLabels();
						const v2 = validate.validateDescription();

						if (v1 && v2) {
							secondFormActions.saveData(user, []);
						}
					}}
					label={"Save"}
					styles={NextButtonStyleConfig}
					loading={state.loading.save.status === "initialized"}
				/>
			</div>
		</Card>
	);
}
