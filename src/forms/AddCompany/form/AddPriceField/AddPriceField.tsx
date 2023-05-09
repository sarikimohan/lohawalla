import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import React from "react";
import Header from "./components/Header/Header";
import AddCard from "./components/AddCard/AddCard";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { useAddCompanyContext } from "../../AddCompany";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import * as yup from "yup";
import { nanoid } from "nanoid";

const validationSchema = yup.object({
	pfArr: yup
		.array(
			yup.object({
				name: yup.string().required("required"),
				type: yup.string(),
				operation: yup.string(),
			})
		)
		.test((value) => {
			const obj: { [key: string]: boolean | undefined } = {};
			if (value) {
				for (let v of value) {
					if (obj[v.name]) {
						return false;
					} else {
						obj[v.name] = true;
					}
				}
				console.log("object was", obj);
				return true;
			} else {
				return true;
			}
		}),
});

interface Props {}

export default function AddPriceField(props: Props) {
	const { state } = useAddCompanyContext();
	return (
		<PopUpContainer>
			<FormContainer>
				<Formik
					initialValues={{
						pfArr: state.tempPriceStructure,
					}}
					onSubmit={function (v, h) {}}
					validationSchema={validationSchema}
				>
					{(props) => {
						return (
							<div className="p-3">
								<div>
									<Header />
								</div>
								<div className="mx-8">
									{props.values.pfArr.map((v, i) => (
										<div className="mb-3" key={v.id}>
											<AddCard
												descName={`pfArr[${i}].name`}
												data={v}
												onChangeType={function (d: string): void {
													props.setFieldValue(`pfArr[${i}].type`, d);
												}}
												onChangeOperation={function (d: string): void {
													props.setFieldValue(`pfArr[${i}].operation`, d);
												}}
												onDelete={() => {
													const list = props.values.pfArr;
													props.setFieldValue(
														`pfArr`,
														list.filter((v, k) => k !== i)
													);
												}}
											/>
										</div>
									))}
								</div>
								<div className="mt-4 jfe">
									<AddMore
										handleAdd={() => {
											const value = props.values.pfArr;
											value.push({
												id: nanoid(),
												name: "",
												type: "numeric",
												operation: "add",
											});
											props.setFieldValue("pfArr", value);
										}}
									/>
								</div>

								<div>
									<DefaultButton
										onClick={function (): void {
											props.validateForm();
										}}
										label={"Save"}
										styles={NextButtonStyleConfig}
									/>
								</div>
							</div>
						);
					}}
				</Formik>
			</FormContainer>
		</PopUpContainer>
	);
}
