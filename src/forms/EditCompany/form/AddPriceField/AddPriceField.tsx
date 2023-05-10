import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import React from "react";
import Header from "./components/Header/Header";
import AddCard from "./components/AddCard/AddCard";
import { Formik, FormikHelpers, FormikValues } from "formik";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import * as yup from "yup";
import { nanoid } from "nanoid";

interface Props {
	close: () => void;
}

export default function AddPriceField(props: Props) {
	// const { state, secondFormActions } = useAddCompanyContext();
	return (
		<PopUpContainer zIndex={500}>
			<FormContainer>
				<div className="p-3">
					<div>
						<Header onClose={props.close} />
					</div>
					<div className="mx-8">
						{[].map((v, i) => (
							<div className="mb-3">
								<AddCard
									data={v}
									descName={""}
									onChangeType={function (d: PercNum): void {
										throw new Error("Function not implemented.");
									}}
									onChangeOperation={function (d: OpType): void {
										throw new Error("Function not implemented.");
									}}
									onChange={function (d: string): void {
										throw new Error("Function not implemented.");
									}}
								/>
							</div>
						))}
					</div>
					<div className="mt-4 jfe">
						<AddMore handleAdd={() => {}} />
					</div>

					<div>
						<DefaultButton
							onClick={function (): void {}}
							label={"Save"}
							styles={NextButtonStyleConfig}
						/>
					</div>
				</div>
			</FormContainer>
		</PopUpContainer>
	);
}
