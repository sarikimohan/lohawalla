import AssetIndex from "@src/assets/AssetIndex";
import React, { useContext } from "react";
import style from "./SecondPart.module.css";
import { motion } from "framer-motion";
import Spacer from "@src/Components/common/Spacer/Spacer";
import FormikInput from "@src/Components/common/inputs/FormikInput";
import { Formik } from "formik";
import { useAddCategoryContext } from "../../AddCategoryForm";
import { Card } from "@mui/material";
import DataTable, {
	DataTableError,
} from "@src/Components/common/DataTable/DataTable";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import * as yup from "yup";

const validationSchema = yup.object({
	credit: yup
		.array(
			yup.object({
				days: yup.number().min(1),
				value: yup.number().min(1).required("credit value is required"),
			})
		)
		.required(),
	negotiation: yup.number().min(1).required(),
});

function SecondPart() {
	const { state, setStateActions, addCategoryActions } =
		useAddCategoryContext();

	const validateFn = (val: { key: string; value: any }, credits: Credit[]) => {
		const errors: DataTableError = {};

		// number check
		const n = parseInt(val.key);
		const m = parseInt(val.value);
		if (Number.isNaN(n)) {
			errors.keyError = "not a valid number";
		}
		if (Number.isNaN(m)) {
			errors.valueError = "not a number";
		}
		for (let v of credits) {
			if (v.days === n) {
				errors.keyError = "value is already present";
			}
		}

		return errors;
	};

	return (
		<Formik
			initialValues={state.secondForm}
			onSubmit={(v, h) => {
				setStateActions.setSecondForm(v);
				addCategoryActions.navFront();
			}}
			validationSchema={validationSchema}
		>
			{(props) => (
				<>
					<Card variant="outlined" sx={{ padding: 3 }}>
						<div className="mb-3">
							<FormCardHeader heading="Credit Working" subheading="Enter" />
						</div>
						<Card variant="outlined" sx={{ padding: 2, marginBottom: 3 }}>
							<DataTable
								header={{ first: "Time day", second: "percentage" }}
								data={props.values.credit.map((v) => ({
									key: v.days + " days",
									value: v.value,
								}))}
								getPath={(v, i) => `credit[${i}].value`}
								onAdd={(d) => {
									const err = validateFn(d, props.values.credit);
									if (!err.keyError && !err.valueError) {
										const fields = props.values.credit;
										fields.push({ days: parseInt(d.key), value: d.value });
										props.setFieldValue("credit", fields);
									}
									return err;
								}}
								onDelete={(i) => {
									const fields = props.values.credit;
									props.setFieldValue(
										"credit",
										fields.filter((v, k) => k !== i)
									);
								}}
							/>
						</Card>
						<div className="mb-6">
							<p className="text-md font-semibold text-slate-800 mb-2">
								Negotiation
							</p>
							<FormikInput
								type={"number"}
								placeHolder={"Enter Negotiation"}
								name={"negotiation"}
							/>
						</div>
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
					</Card>
				</>
			)}
		</Formik>
	);
}

export default SecondPart;
