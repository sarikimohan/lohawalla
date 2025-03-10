import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import React from "react";
import { useAddCompanyContext } from "../../AddCompany";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import AssetIndex from "@src/assets/AssetIndex";
import Spacer from "@src/Components/common/Spacer/Spacer";

function FirstPart() {
	const { firstFormActions, state, addCompanyActions, validate } =
		useAddCompanyContext();
	return (
		<div>
			<div className="mb-4">
				<p className="text-md font-semibold text-slate-900 mb-1">
					Company Name
				</p>
				<FieldInput
					{...state.firstForm.companyName}
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
				<div className="vc w-100">
					<p className="h3 fcolor-text-body fw-bold mr-4">
						Upload a Photo of Category
					</p>
					<AssetIndex.LinkIcon />
				</div>
				<Spacer height={16} />
				<FormFileUpload
					values={state.images}
					onChange={(e) => {
						addCompanyActions.setImages(e);
					}}
				/>
			</div>
			<div>
				<DefaultButton
					onClick={() => {
						validate.valiadteFirstForm(() => {
							addCompanyActions.mutateState((p) => p.page++);
						});
					}}
					label={"Next"}
					styles={NextButtonStyleConfig}
					loading={state.loading.checkName.status === "initialized"}
					loadingColor={"#fff"}
				/>
			</div>
		</div>
	);
}

export default FirstPart;
