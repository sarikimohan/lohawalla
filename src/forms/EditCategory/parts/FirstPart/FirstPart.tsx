import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import React from "react";
import { useEditCategoryContext } from "../../EditCategory";

interface Props {}

export default function FirstPart(props: Props) {
	const { editCategoryActions, state } = useEditCategoryContext();

	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Category Name
				</p>
				<FieldInput
					isValid={state.categoryName.isValid}
					error={state.categoryName.error}
					data={state.categoryName.value}
					onChange={(d) => {
						editCategoryActions.setName(d.target.value);
					}}
					type={"text"}
					placeHolder={"enter item name"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Category Code
				</p>
				<FieldInput
					isValid={state.categoryCode.isValid}
					error={state.categoryCode.error}
					data={state.categoryCode.value}
					onChange={d=>editCategoryActions.setCode(d.target.value)}
					type={"text"}
					placeHolder={"enter item name"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Negotiation</p>
				<FieldInput
					isValid={state.negotiation.isValid}
					error={state.negotiation.error}
					data={state.negotiation.value}
					onChange={d=>editCategoryActions.setNegotiation(d.target.value)}
					type={"text"}
					placeHolder={"enter negotiation value"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Unit</p>
				<FieldInput
					isValid={state.unit.isValid}
					error={state.unit.error}
					data={state.unit.value}
					onChange={d=>editCategoryActions.setUnit(d.target.value)}
					type={"text"}
					placeHolder={"enter unit name"}
				/>
			</div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">Description</p>
				<FieldTextArea
					isValid={state.description.isValid}
					error={state.description.error}
					data={state.description.value}
					onChange={d=>editCategoryActions.setDescription(d.target.value)}
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
