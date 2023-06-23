import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import React, { useRef } from "react";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import { useAddItemContext } from "../../AddItem";
import UnitInput, {
	PIUnitInput,
} from "@src/Components/special/UnitInput/UnitInput";
import FormFileUploadHeader from "@src/Components/forms/FormFileUploadHeader/FormFileUploadHeader";

interface Props {}

export default function FirstPart(props: Props) {
	const { state, firstFormActions, validate, categoryId } = useAddItemContext();

	const ref = useRef<PIUnitInput.SetHandleProps | null>(null);

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
				<p className="text-md font-semibold text-slate-900 mb-1">Select Unit</p>
				<UnitInput
					unitList={state.unitList}
					value={state.unit}
					onChange={(e) => {
						firstFormActions.mutateState((p) => {
							p.unit = e;
						});
					}}
					setHandle={function (data: PIUnitInput.SetHandleProps): void {
						ref.current = data;
					}}
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
				<div className="mb-3">
					<FormFileUploadHeader>Upload image of item</FormFileUploadHeader>
				</div>
				<FormFileUpload
					onChange={(e) => {
						firstFormActions.mutateState((p) => (p.images = e));
					}}
				/>
			</div>
			<div>
				<DefaultButton
					onClick={() => {
						validate.validateFirstForm(categoryId, () => {
							if (ref.current) {
								ref.current.validate();
								if (ref.current.isValid)
									firstFormActions.mutateState((p) => p.page++);
							}
						});
					}}
					label={"Next"}
					styles={NextButtonStyleConfig}
					loading={
						state.loading.checkName.status === "initialized" ||
						state.loading.checkCode.status === "initialized"
					}
					loadingColor={"#fff"}
				/>
			</div>
		</div>
	);
}
