import FormFileUpload from "@src/Components/common/FormFileUpload/FormFileUpload";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import React from "react";

interface Props {}

export default function FirstPart(props: Props) {
	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Name</p>
				<FieldInput
					isValid={undefined}
					data={""}
					type={"text"}
					placeHolder={"enter item name"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Item HSN Code
				</p>
				<FieldInput
					isValid={undefined}
					data={""}
					type={"number"}
					placeHolder={"enter item HSN Code"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Item Code</p>
				<FieldInput
					isValid={undefined}
					data={""}
					type={"text"}
					placeHolder={"enter item Code"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<FieldTextArea
					onChange={(e) => {}}
					height={100}
					placeHolder={"enter company name"}
					isValid={undefined}
					data={""}
				/>
			</div>
			<div className="mb-5">
				<FormFileUpload />
			</div>
			<div>
				<DefaultButton
					onClick={() => {}}
					label={"Next"}
					styles={NextButtonStyleConfig}
				/>
			</div>
		</div>
	);
}
