import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import React from "react";
import Header from "./components/Header/Header";
import AddCard from "./components/AddCard/AddCard";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { useAddCompanyContext } from "../../AddCompany";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";

interface Props {}

export default function AddPriceField(props: Props) {
	const { state } = useAddCompanyContext();
	return (
		<PopUpContainer>
			<FormContainer>
				<Formik
					initialValues={{
						tempPriceStructure: state.tempPriceStructure,
					}}
					onSubmit={function (v, h) {}}
				>
					{(props) => (
						<div className="p-3">
							<div>
								<Header />
							</div>
							<div className="mx-8">
								{props.values.tempPriceStructure.map((v, i) => (
									<div className="mb-3">
										<AddCard
											descName={`tempPriceStructure[${i}].name`}
											data={v}
											onDelete={function () {
												props.setFieldValue(
													"tempPriceStructure",
													props.values.tempPriceStructure.filter(
														(v, k) => k !== i
													)
												);
											}}
											onChangeType={(d) => {
												props.setFieldValue(`tempPriceStructure[${i}].type`, d);
											}}
											onChangeOperation={(d) => {
												props.setFieldValue(
													`tempPriceStructure[${i}].operation`,
													d
												);
											}}
										/>
									</div>
								))}
							</div>
							<div className="mt-4 jfe">
								<AddMore
									handleAdd={() => {
										const value = props.values.tempPriceStructure;
										value.push({ name: "", type: "numeric", operation: "add" });
										props.setFieldValue("tempPriceStructure", value);
									}}
								/>
							</div>
						</div>
					)}
				</Formik>
			</FormContainer>
		</PopUpContainer>
	);
}
