import AssetIndex from "@src/assets/AssetIndex";
import React, { useContext } from "react";
import style from "./SecondPart.module.css";
import { motion } from "framer-motion";
import Spacer from "@src/Components/common/Spacer/Spacer";
import FormikInput from "@src/Components/common/inputs/FormikInput";
import { Formik } from "formik";
import { useAddCategoryContext } from "../../AddCategoryForm";
import { Button, Card } from "@mui/material";
import DataTable, {
	DataTableAddFn,
	DataTableError,
} from "@src/Components/common/DataTable/DataTable";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";

function SecondPart() {
	const { state } = useAddCategoryContext();

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
		<Formik initialValues={state.secondForm} onSubmit={(v, h) => {}}>
			{(props) => (
				<>
					<Card variant="outlined" sx={{ padding: 3 }}>
						<div className="mb-3">
							<FormCardHeader heading="Credit Working" subheading="Enter" />
						</div>
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
				</>
			)}
		</Formik>
	);
}

export default SecondPart;
