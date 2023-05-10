import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import React from "react";
import { useAddCompanyContext } from "../../AddCompany";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";

function FirstPart() {
	const { firstFormActions, state, addCompanyActions } = useAddCompanyContext();
	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Company Name
				</p>
				<FieldInput
					isValid={state.firstForm.companyName.isValid}
					error={state.firstForm.companyName.error}
					data={state.firstForm.companyName.value}
					onChange={(d) => {
						firstFormActions.setCompany(d.target.value);
					}}
					type={"text"}
					placeHolder={"enter company name"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<FieldTextArea
					isValid={state.firstForm.description.isValid}
					error={state.firstForm.description.error}
					data={state.firstForm.description.value}
					onChange={(e) => {
						firstFormActions.setDescription(e.target.value);
					}}
					height={100}
					placeHolder={"enter company name"}
				/>
			</div>
			<div className="mb-5">
				<FormFileUpload
					onChange={(e) => {
						addCompanyActions.setImages(e);
					}}
				/>
			</div>
			<div>
				<DefaultButton
					onClick={() => {
						const verdict = firstFormActions.validateFirstForm();
						if (verdict) {
							addCompanyActions.navFront();
						}
					}}
					label={"Next"}
					styles={NextButtonStyleConfig}
				/>
			</div>
		</div>
	);
}

export default FirstPart;
