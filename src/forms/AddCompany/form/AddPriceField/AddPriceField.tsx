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
						<>
							<div>
								<Header />
							</div>
							<div className="mx-8">
								{props.values.tempPriceStructure.map((v, i) => (
									<AddCard
										names={{
											descriptionName: `tempPriceStructure[${i}].descrition`,
											typeName: "",
											valueName: "",
										}}
									/>
								))}
							</div>
							<div className="mt-4 jfe">
								<AddMore />
							</div>
						</>
					)}
				</Formik>
			</FormContainer>
		</PopUpContainer>
	);
}
