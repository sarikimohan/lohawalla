import { Card } from "@mui/material";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import React, { useRef, useState } from "react";
import { useEditItemContext } from "../../EditItem";
import EntryTable from "@src/Components/special/EntryTable/EntryTable";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import { useAuthGuardContext } from "@src/auth/AuthGuard/AuthGuard";

interface Props {}

export default function ThirdPart(props: Props) {
	const { state, editItemFormActions: _, handle, id } = useEditItemContext();

	const ref = useRef<{ isVaid: boolean; validate: () => void }>({
		isVaid: true,
		validate: () => {},
	});

	const { user } = useAuthGuardContext();

	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="mb-4">
					<FormCardHeader heading="Global Fields" subheading="Enter" />
				</div>
				<Card sx={{ padding: 3 }} variant="outlined">
					<EntryTable
						list={state.descriptionLabels
							.sort((a, b) => a.position - b.position)
							.map((v) => ({
								key: v.key,
								value: v.value,
							}))}
						validate={state.triggerSubmit}
						onValidated={(d) => {
							_.setValidation(0)(d);
						}}
						onChangeFieldValue={function (value: string, index: number): void {
							_.mutateState((p) => {
								p.descriptionLabels[index].value = value;
							});
						}}
						validateFieldValue={Validators.validateNull}
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
						setHandle={(i, v) => {
							ref.current = {
								isVaid: i,
								validate: v,
							};
						}}
					/>
				</Card>
			</Card>
			<DefaultButton
				onClick={function (): void {
					console.log("running");
					Object.values(handle.current).map((v, i) => {
						v.validate();
					});
					ref.current.validate();

					// final validation
					const verdict =
						Object.values(handle.current).reduce(
							(a, c) => a && c.isValid,
							true
						) && ref.current.isVaid;

					if (verdict) {
						// _.save(id, user);
						console.log('ready to save');
					} else {
						console.log('error in form')
					}

				}}
				loading={state.loading.saveData.status === "initialized"}
				label={"SAVE"}
				loadingColor={"white"}
			/>
		</>
	);
}
