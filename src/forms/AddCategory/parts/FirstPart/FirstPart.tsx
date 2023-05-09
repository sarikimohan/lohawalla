import React from "react";
import style from "./FirstPart.module.css";
import Spacer from "@src/Components/common/Spacer/Spacer";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import FormFileUpload from "@src/Components/common/FormFileUpload/FormFileUpload";
import AssetIndex from "@src/assets/AssetIndex";
import { Formik } from "formik";
import FormikInput from "@src/Components/common/inputs/FormikInput";
import FormikTextArea from "@src/Components/common/inputs/TextArea";
import * as Yup from "yup";
import { useAddCategoryContext } from "../../AddCategoryForm";

const validationSchema = Yup.object({
	categoryName: Yup.string().required("required"),
	categoryCode: Yup.string()
		.matches(/^[0-9]*$/, { message: "not a number" })
		.required(),
	description: Yup.string().required(),
	unit: Yup.string().required(),
});

function FirstPart() {
	const { state, setStateActions, addCategoryActions } =
		useAddCategoryContext();
	console.log(state);
	return (
		<div className={style.inputBox}>
			<p className="body fw-medium fcolor-fuschia">Category Name</p>
			<Spacer height={8} />
			<Formik
				initialValues={state.firstForm}
				onSubmit={(v, h) => {
					setStateActions.setFirstForm(v);
					addCategoryActions.navFront();
				}}
				validationSchema={validationSchema}
			>
				{(props) => (
					<>
						<FormikInput
							width={"100%"}
							type={"text"}
							placeHolder="Enter TMT Bar"
							inputClassName={style.formInput}
							name="categoryName"
						/>
						<Spacer height={8 * 2} />

						<p className="body fw-medium fcolor-fuschia">Category Code</p>
						<Spacer height={8} />
						<FormikInput
							width={"100%"}
							type={"text"}
							placeHolder="Enter “52636325”"
							inputClassName={style.formInput}
							name="categoryCode"
						/>
						<Spacer height={8 * 2} />

						<p className="body fw-medium fcolor-fuschia">Unit</p>
						<Spacer height={8} />
						<FormikInput
							width={"100%"}
							type={"text"}
							placeHolder="ton"
							inputClassName={style.formInput}
							name="unit"
						/>
						<Spacer height={8 * 2} />

						<p className="body fw-medium fcolor-fuschia">Description</p>
						<Spacer height={8} />
						<FormikTextArea
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
								onClick={() => {
									props.validateForm();
									if (props.isValid) {
										props.submitForm();
									}
								}}
								label={"Next"}
								styles={NextButtonStyleConfig}
							/>
						</div>
					</>
				)}
			</Formik>
		</div>
	);
}

export default FirstPart;
