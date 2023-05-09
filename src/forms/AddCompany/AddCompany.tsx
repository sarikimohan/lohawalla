import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React, { useContext, useState } from "react";
import { InitialState } from "./managment/state/initialState";
import AddCompanyActions from "./managment/actions/AddCompanyActions";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import { Button, Card, Checkbox, Divider, Input } from "@mui/material";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import AssetIndex from "@src/assets/AssetIndex";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AddPriceField from "./form/AddPriceField/AddPriceField";
import { useFormik } from "formik";
import FirstPart from "./parts/FirstPart/FirstPart";

interface Props {}
interface ContextProps {
	state: AddCompany.State;
	addCompanyActions: AddCompanyActions;
}

const AddCompanyContext = React.createContext({} as ContextProps);

export const useAddCompanyContext = () => useContext(AddCompanyContext);

export default function AddCompany(props: Props) {
	const [state, setState] = useState<AddCompany.State>(InitialState);
	const [showAdd, setShowAdd] = useState(false);
	const addCompanyActions = new AddCompanyActions(state, setState);

	return (
		<AddCompanyContext.Provider value={{ state, addCompanyActions }}>
			<PopUpContainer>
				<FormContainer>
					<div className="mb-4">
						<FormHeader
							navBack={function (): void {}}
							close={function (): void {}}
							heading={"Company"}
							preHeading={"Add"}
						/>
					</div>
					<div className="mb-5">
						<ProgressBar currentStep={state.page + 1} steps={3} />
					</div>
					<div className="mb-4">{state.page === 0 && <FirstPart />}</div>
				</FormContainer>
			</PopUpContainer>
			{showAdd && <AddPriceField />}
		</AddCompanyContext.Provider>
	);
}
