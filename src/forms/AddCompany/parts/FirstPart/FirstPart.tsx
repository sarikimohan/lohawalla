import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import React from "react";

function FirstPart() {
	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Company Name
				</p>
				<FieldInput
					isValid={undefined}
					data={""}
					type={"text"}
					placeHolder={"enter company name"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<FieldTextArea
					isValid={undefined}
					data={""}
					height={100}
					placeHolder={"enter company name"}
				/>
			</div>
			<div>
				<FormFileUpload />
			</div>
		</div>
	);
}

export default FirstPart;
