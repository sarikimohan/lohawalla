import { Card } from "@mui/material";
import DataTable from "@src/Components/common/DataTable/DataTable";
import SaveButton from "@src/Components/common/buttons/SaveButton/SaveButton";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { motion } from "framer-motion";
import React from "react";
import { useAddCategoryContext } from "../../AddCategoryForm";

import * as yup from "yup";

function ThirdPart() {
	const { state, addCategoryActions, setStateActions } =
		useAddCategoryContext();
	return (
		<Card variant="outlined" sx={{ padding: 3 }}>
			<Formik
				initialValues={state.thirdForm}
				onSubmit={function (v, h) {
					setStateActions.setThridForm(v);

					// TODO add the submission
					addCategoryActions.submit();
				}}
			>
				{(props) => (
					<>
						<div className="mb-6">
							<FormCardHeader heading="Global Fields" subheading="Enter" />
							<Card variant="outlined" sx={{ padding: 2, marginBottom: 3 }}>
								<DataTable
									header={{ first: "Description", second: "value" }}
									data={props.values.descriptionLabels}
									getPath={(v, i) => `descriptionLabels[${i}].value`}
									onAdd={({ key, value }) => {
										console.log(key, value);
										const descriptions = props.values.descriptionLabels;
										descriptions.push({ key, value });
										props.setFieldValue("descriptionLabels", descriptions);
										return {};
									}}
									onDelete={(i) => {
										const descriptions = props.values.descriptionLabels;
										props.setFieldValue(
											"descriptionLabels",
											descriptions.filter((v, k) => k !== i)
										);
									}}
								/>
							</Card>
						</div>
						<div className="crow jfe">
							<SaveButton>Save</SaveButton>
						</div>
					</>
				)}
			</Formik>
		</Card>
	);
}

export default ThirdPart;
