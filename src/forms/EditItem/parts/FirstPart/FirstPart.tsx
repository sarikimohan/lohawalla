import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import React from "react";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import { useEditItemContext } from "../../EditItem";

interface Props {}

export default function FirstPart(props: Props) {
	const { state, editItemFormActions: _ } = useEditItemContext();
	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Name</p>
				<FieldInput
					{...state.itemName}
					onChange={(d) => {
						_.mutateState((p) => {
							p.itemName.value = d.target.value;
						});
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
					onChange={(d) => {
						_.mutateState((p) => {
							p.itemHSNCode.value = d.target.value;
						});
					}}
					type={"number"}
					placeHolder={"enter item HSN Code"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Code</p>
				<FieldInput
					{...state.itemCode}
					onChange={(d) => {
						_.mutateState((p) => {
							p.itemCode.value = d.target.value;
						});
					}}
					type={"text"}
					placeHolder={"enter item Code"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<FieldTextArea
					{...state.description}
					onChange={(d) => {
						_.mutateState((p) => {
							p.description.value = d.target.value;
						});
					}}
					height={100}
					placeHolder={"enter company name"}
				/>
			</div>
			<div className="mb-5">
				<FormFileUpload />
			</div>
		</div>
	);
}
