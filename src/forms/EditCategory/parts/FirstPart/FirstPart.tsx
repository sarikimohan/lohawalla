import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import React from "react";

interface Props {}

export default function FirstPart(props: Props) {
	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Category Name
				</p>
				<FieldInput
					type={"text"}
					placeHolder={"enter item name"}
					isValid={undefined}
					data={""}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Category Code
				</p>
				<FieldInput
					type={"text"}
					placeHolder={"enter item name"}
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
			<div>
				<FormFileUpload />
			</div>
		</div>
	);
}
