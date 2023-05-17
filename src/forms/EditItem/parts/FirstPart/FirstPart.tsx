import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import React, { useRef, useEffect } from "react";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import { useEditItemContext } from "../../EditItem";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";

interface Props {}

export default function FirstPart(props: Props) {
	const { state, editItemFormActions: _ } = useEditItemContext();

	const handle = useRef<
		Record<string, { isValid: boolean; validate: () => void }>
	>({});

	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Name</p>
				<ValidatedEntry
					onChange={(d) => {
						_.mutateState((p) => {
							p.itemName = d;
						});
					}}
					value={state.itemName}
					triggerValidation={state.triggerSubmit}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull
						);
					}}
					placeholder="enter item name"
					onValidation={_.setValidation(0)}
					setHandle={(i, v) => {
						handle.current["v1"] = { isValid: i, validate: v };
					}}
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
					triggerValidation={state.triggerSubmit}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull,
							Validators.validateInt
						);
					}}
					placeholder="enter item HSN Code"
					onValidation={_.setValidation(1)}
					setHandle={(i, v) => {
						handle.current["v2"] = { isValid: i, validate: v };
					}}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Code</p>
				<ValidatedEntry
					onChange={(d) => {
						_.mutateState((p) => {
							p.itemCode = d;
						});
					}}
					value={state.itemCode}
					triggerValidation={state.triggerSubmit}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull
						);
					}}
					placeholder="enter item name"
					onValidation={_.setValidation(2)}
					setHandle={(i, v) => {
						handle.current["v3"] = { isValid: i, validate: v };
					}}
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
					triggerValidation={state.triggerSubmit}
					validateFunction={(d) => {
						return FieldDataService.registerValidator(
							d,
							{ isValid: true },
							Validators.validateNull
						);
					}}
					placeholder="enter item name"
					onValidation={_.setValidation(3)}
					setHandle={(i, v) => {
						handle.current["v4"] = { isValid: i, validate: v };
					}}
				/>
			</div>
			<div>
				<button
					onClick={() => {
						Object.values(handle.current).forEach((v) => {
							v.validate();
						});
						console.log(
							"just after validation",
							Object.values(handle.current).reduce(
								(a, c) => a && c.isValid,
								true
							)
						);
					}}
				>
					validate
				</button>
			</div>
			<div className="mb-5">
				<FormFileUpload />
			</div>
		</div>
	);
}
