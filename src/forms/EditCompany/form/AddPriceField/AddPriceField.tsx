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
	data: EditCompany.NewPriceField[];
	onChangeType: (d: PercNum, i: number) => void;
	onChangeOperation: (d: OpType, i: number) => void;
	onChange: (d: string, i: number) => void;
	addPriceField: () => void;
	onSave: () => void;
	deletePriceField: (i: number) => void;
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
						{props.data.map((v, i) => (
							<div className="mb-3" key={v.id}>
								<AddCard
									onDelete={() => {
										props.deletePriceField(i);
									}}
									data={v}
									descName={""}
									onChangeType={(d) => props.onChangeType(d, i)}
									onChangeOperation={(d) => props.onChangeOperation(d, i)}
									onChange={(d) => props.onChange(d, i)}
								/>
							</div>
						))}
					</div>
					<div className="mt-4 jfe">
						<AddMore handleAdd={props.addPriceField} />
					</div>

					<div>
						<DefaultButton
							onClick={function (): void {
								props.onSave();
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
