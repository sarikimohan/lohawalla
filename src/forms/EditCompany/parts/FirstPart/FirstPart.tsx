import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import React from "react";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { Groups, useEditCompanyContext } from "../../EditCompany";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";

function FirstPart() {
	const { setHandle, state, stateUtils } = useEditCompanyContext();
	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Company Name
				</p>
				<ValidatedEntry
					type={"text"}
					placeHolder={"enter company name"}
					setHandle={setHandle(Groups.plain, "name")}
					validateFunction={FieldDataService.clubValidators(
						Validators.validateNull
					)}
					value={state.companyName}
					onChange={(d) => {
						stateUtils.mutateState((p) => {
							p.companyName = d;
						});
					}}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<ValidatedEntry
					type="text"
					placeHolder="enter description"
					setHandle={setHandle(Groups.plain, "description")}
					value={state.description}
					onChange={(d) => {
						stateUtils.mutateState((p) => {
							p.description = d;
						});
					}}
					validateFunction={Validators.validateNull}	
				/>
			</div>
			<div className="mb-5">
				<FormFileUpload />
			</div>
		</div>
	);
}

export default FirstPart;
