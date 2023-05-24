import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import React from "react";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";

function FirstPart() {
	// const { firstFormActions, state, addCompanyActions } = useAddCompanyContext();
	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Company Name
				</p>
				<FieldInput
					type={"text"}
					placeHolder={"enter company name"}
					isValid={undefined}
					data={""}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<FieldTextArea
					height={100}
					placeHolder={"enter company name"}
					isValid={undefined}
					data={""}
				/>
			</div>
			<div className="mb-5">
				<FormFileUpload />
			</div>

		</div>
	);
}

export default FirstPart;
