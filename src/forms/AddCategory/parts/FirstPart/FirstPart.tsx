import React from "react";
import style from "./FirstPart.module.css";
import Spacer from "@src/Components/common/Spacer/Spacer";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import FormFileUpload from "@src/Components/common/FormFileUpload/FormFileUpload";
import AssetIndex from "@src/assets/AssetIndex";
import { Formik } from "formik";
import FormikTextArea from "@src/Components/common/inputs/TextArea";
import * as Yup from "yup";
import { useAddCategoryContext } from "../../AddCategoryForm";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";

function FirstPart() {
	const { state, setStateActions, addCategoryActions, validate } =
		useAddCategoryContext();

	return (
		<div className={style.inputBox}>
			<p className="body fw-medium fcolor-fuschia">Category Name</p>
			<Spacer height={8} />

			<FieldInput
				width={"100%"}
				type={"text"}
				placeHolder="Enter Category Name"
				{...state.firstForm.categoryName}
				onChange={(d) => {
					addCategoryActions.mutateState((p) => {
						p.firstForm.categoryName.value = d.target.value;
					});
				}}
			/>
			<Spacer height={8 * 2} />

			<p className="body fw-medium fcolor-fuschia">Category Code</p>
			<Spacer height={8} />
			<FieldInput
				width={"100%"}
				type={"text"}
				{...state.firstForm.categoryCode}
				onChange={(d) => {
					addCategoryActions.mutateState((p) => {
						p.firstForm.categoryCode.value = d.target.value;
					});
				}}
				placeHolder="Enter “52636325”"
				inputClassName={style.formInput}
				name="categoryCode"
				isLoading={state.loading.checkCode.status === "initialized"}
			/>

			<Spacer height={8 * 2} />

			<p className="body fw-medium fcolor-fuschia">Unit</p>
			<Spacer height={8} />
			<FieldInput
				{...state.firstForm.unit}
				onChange={(d) => {
					addCategoryActions.mutateState((p) => {
						p.firstForm.unit.value = d.target.value;
					});
				}}
				width={"100%"}
				type={"text"}
				placeHolder="enter unit"
				inputClassName={style.formInput}
				name="unit"
			/>
			<Spacer height={8 * 2} />

			<p className="body fw-medium fcolor-fuschia">Description</p>
			<Spacer height={8} />
			<FieldTextArea
				isValid={state.firstForm.description.isValid}
				error={state.firstForm.description.error}
				data={state.firstForm.description.value}
				onChange={(d) => {
					addCategoryActions.mutateState((p) => {
						p.firstForm.description.value = d.target.value;
					});
				}}
				width={"100%"}
				height={120}
				placeHolder="Enter discription"
				inputClassName={style.formInput}
				name="description"
			/>
			<Spacer height={24} />

			<div className="vc w-100">
				<p className="h3 fcolor-text-body fw-bold mr-4">
					Upload a Photo of Category
				</p>
				<AssetIndex.LinkIcon />
			</div>
			<Spacer height={16} />

			<FormFileUpload
				onChange={(d) => {
					setStateActions.mutateState((p) => {
						p.images = d;
					});
				}}
			/>
			<Spacer height={16} />
			<div className="crow jfe">
				<DefaultButton
					loading={
						state.loading.checkName.status === "initialized" ||
						state.loading.checkCode.status === "initialized"
					}
					loadingColor={"#fff"}
					onClick={() => {
						validate.validateFirstForm(() => {
							addCategoryActions.mutateState((p) => {
								p.page++;
							});
						});
					}}
					label={"Next"}
					styles={NextButtonStyleConfig}
				/>
			</div>
		</div>
	);
}

export default FirstPart;
