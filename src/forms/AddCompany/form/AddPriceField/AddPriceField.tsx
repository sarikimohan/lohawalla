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

interface Props {
	close: () => void;
}

export default function AddPriceField(props: Props) {
	const { state, secondFormActions } = useAddCompanyContext();
	return (
		<PopUpContainer zIndex={500}>
			<FormContainer>
				<div className="p-3">
					<div>
						<Header onClose={props.close} />
					</div>
					<div className="mx-8">
						{state.tempPriceStructure.map((v, i) => (
							<div className="mb-3" key={v.id}>
								<AddCard
									data={v}
									onChangeType={function (d: PercNum): void {
										secondFormActions.setType(d, i);
									}}
									onChangeOperation={function (d: OpType): void {
										secondFormActions.setOperation(d, i);
									}}
									onDelete={() => {
										secondFormActions.deletePriceField(i);
									}}
									descName={""}
									onChange={function (d: string): void {
										secondFormActions.setDescription(d, i);
									}}
								/>
							</div>
						))}
					</div>
					<div className="mt-4 jfe">
						<AddMore
							handleAdd={() => {
								secondFormActions.addPriceField();
							}}
						/>
					</div>

					<div>
						<DefaultButton
							onClick={function (): void {
								const verdict = secondFormActions.validateAddForm();
								if (verdict) {
									secondFormActions.saveTempPriceField();
									props.close();
								}
							}}
							label={"Save"}
							styles={NextButtonStyleConfig}
						/>
					</div>
				</div>
			</FormContainer>
		</PopUpContainer>
	);
}
