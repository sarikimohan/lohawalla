import AssetIndex from "@src/assets/AssetIndex";
import React, { useContext } from "react";
import style from "./SecondPart.module.css";
import { motion } from "framer-motion";
import Spacer from "@src/Components/common/Spacer/Spacer";
import FormikInput from "@src/Components/common/inputs/FormikInput";
import { Formik } from "formik";
import { useAddCategoryContext } from "../../AddCategoryForm";
import { Button } from "@mui/material";
import DataTable from "@src/Components/common/DataTable/DataTable";

function SecondPart() {
	const { state } = useAddCategoryContext();

	return (
		<Formik initialValues={state.secondForm} onSubmit={(v, h) => {}}>
			{(props) => (
				<>
					<DataTable
						header={{ first: "Time day", second: "percentage" }}
						data={state.secondForm.credit.map((v) => ({
							key: v.days + " days",
							value: v.value,
						}))}
						getPath={(v, i) => `credit[${i}].value`}
					/>
				</>
			)}
		</Formik>
	);
}

export default SecondPart;
