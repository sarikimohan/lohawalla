import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import React, { useRef, useEffect } from "react";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import { useEditItemContext } from "../../EditItem";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import checkNameIsUnique from "../../fetch/services/checkNameIsUnique";
import checkCodeIsUnique from "../../fetch/services/checkCodeIsUnique";

interface Props {}

export default function FirstPart(props: Props) {
	const { state, editItemFormActions: _, setHandle } = useEditItemContext();

	console.log(state.itemName);
	
	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Name</p>
				<ValidatedEntry
					onChange={(d) => {
						_.mutateState((p) => {
							p.itemName.setValue(d);
						});
					}}
					value={state.itemName.getValue()}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull
						);
					}}
					placeHolder="enter item name"
					setHandle={setHandle("v1")}
					asyncValidator={(d) =>
						checkNameIsUnique(d, state.itemName.hasChanged())
					}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Item HSN Code
				</p>
				<ValidatedEntry
					onChange={(d) => {
						_.mutateState((p) => {
							p.itemHSNCode = d;
						});
					}}
					value={state.itemHSNCode}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull,
							Validators.validateInt
						);
					}}
					placeHolder="enter item HSN Code"
					setHandle={setHandle("v2")}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Code</p>
				<ValidatedEntry
					onChange={(d) => {
						_.mutateState((p) => {
							p.itemCode.setValue(d);
						});
					}}
					value={state.itemCode.getValue()}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull
						);
					}}
					placeHolder="enter item name"
					setHandle={setHandle("v3")}
					asyncValidator={(d) =>
						checkCodeIsUnique(d, state.itemCode.hasChanged())
					}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<ValidatedEntry
					onChange={(d) => {
						_.mutateState((p) => {
							p.description = d;
						});
					}}
					value={state.description}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull
						);
					}}
					placeHolder="enter item name"
					setHandle={setHandle("v4")}
				/>
			</div>
			<div className="mb-5">
				<FormFileUpload />
			</div>
		</div>
	);
}
