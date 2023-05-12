import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import React from "react";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import { useAddItemContext } from "../../AddItem";

interface Props {}

export default function FirstPart(props: Props) {
	const { state, firstFormActions } = useAddItemContext();

	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Name</p>
				<FieldInput
					{...state.itemName}
					onChange={(e) => {
						firstFormActions.setName(e.target.value);
					}}
					type={"text"}
					placeHolder={"enter item name"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Item HSN Code
				</p>
				<FieldInput
					{...state.itemHSNCode}
					onChange={(e) => {
						firstFormActions.setHSNCode(e.target.value);
					}}
					type={"number"}
					placeHolder={"enter item HSN Code"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Code</p>
				<FieldInput
					{...state.itemCode}
					onChange={(e) => {
						firstFormActions.setCode(e.target.value);
					}}
					type={"text"}
					placeHolder={"enter item Code"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<FieldTextArea
					{...state.description}
					onChange={(e) => {
						firstFormActions.setDescription(e.target.value);
					}}
					height={100}
					placeHolder={"enter company name"}
				/>
			</div>
			<div className="mb-5">
				<FormFileUpload />
			</div>
			<div>
				<DefaultButton
					onClick={() => {
						const verdict = firstFormActions.validate();
						if (verdict) {
							firstFormActions.mutateState((p) => p.page++);
						}
					}}
					label={"Next"}
					styles={NextButtonStyleConfig}
				/>
			</div>
		</div>
	);
}
