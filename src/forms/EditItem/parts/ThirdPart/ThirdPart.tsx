import { Card } from "@mui/material";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React, { useState } from "react";
import { useEditItemContext } from "../../EditItem";
import EntryTable from "@src/Components/special/EntryTable/EntryTable";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";

interface Props {}

export default function ThirdPart(props: Props) {
	const { state, editItemFormActions: _ } = useEditItemContext();
	console.log(
		state.descriptionLabels.map((v) => ({
			key: v.key,
			value: v.value,
		}))
	);

	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="mb-4">
					<FormCardHeader heading="Global Fields" subheading="Enter" />
				</div>
				<Card sx={{ padding: 3 }} variant="outlined">
					<EntryTable
						list={state.descriptionLabels.map((v) => ({
							key: v.key,
							value: v.value,
						}))}
						validate={state.triggerSubmit}
						onValidated={function (isValid: boolean): void {
							_.mutateState((p) => {
								p.validation.descriptionLabels = isValid;
							});
						}}
						onChangeFieldValue={function (value: string, index: number): void {
							_.mutateState((p) => {
								p.descriptionLabels[index].value = value;
							});
						}}
						validateFieldValue={function (value: string): string | undefined {
							return FieldDataService.registerValidator(
								value,
								{ isValid: true },
								Validators.validateNull
							);
						}}
						validateAddKey={function (value: string): string | undefined {
							return FieldDataService.registerValidator(
								value,
								{ isValid: true },
								Validators.validateNull,
								(d) => {
									for (let i of state.descriptionLabels) {
										if (d === i.key) {
											return d + " is already present";
										}
									}
								}
							);
						}}
						validateAddValue={function (value: string): string | undefined {
							return FieldDataService.registerValidator(
								value,
								{ isValid: true },
								Validators.validateNull
							);
						}}
						deleteField={function (i: number): void {
							_.mutateState((p) => {
								p.descriptionLabels = p.descriptionLabels.filter(
									(v, k) => i !== k
								);
							});
						}}
						onAddField={function (key: string, value: string): void {
							_.mutateState((p) => {
								p.descriptionLabels.push({
									key,
									value,
									position: p.descriptionLabels.length,
								});
							});
						}}
					/>
				</Card>
			</Card>
			<DefaultButton
				onClick={function (): void {
					_.mutateState((p) => {
						p.triggerSubmit = !p.triggerSubmit;
					});
				}}
				label={"SAVE"}
			/>
		</>
	);
}
