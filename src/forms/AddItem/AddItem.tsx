import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React, { useContext, useState } from "react";
import { Context } from "vm";
import { InitialState } from "./managment/state/initialState";
import FirstFormActions from "./managment/actions/FirstFormActions";
import FirstPart from "./parts/FirstPart/FirstPart";
import SecondPart from "./parts/SecondPart/SecondPart";
import SecondFormActions from "./managment/actions/SecondFormActions";
import DescriptionActions from "./managment/actions/DescriptionActions";
import ThirdPart from "./parts/ThirdPart/ThirdPart";
import SubmitActions from "./managment/actions/SubmitActions";
import { stat } from "fs";

interface ContextProps {
	firstFormActions: FirstFormActions;
	secondFormActions: SecondFormActions;
	descriptionActions: DescriptionActions;
	state: AddItem.State;
	saveFormAction : SubmitActions
}

const AddItemContext = React.createContext({} as ContextProps);
export const useAddItemContext = () => useContext(AddItemContext);

function AddItem() {
	const [state, setState] = useState<AddItem.State>(InitialState);
	const firstFormActions = new FirstFormActions(state, setState);
	const secondFormActions = new SecondFormActions(state, setState);
	const descriptionActions = new DescriptionActions(state, setState);
	const saveFormAction = new SubmitActions(state,setState)
	return (
		<AddItemContext.Provider
			value={{
				state,
				firstFormActions,
				secondFormActions,
				descriptionActions,
				saveFormAction
			}}
		>
			<PopUpContainer>
				<FormContainer>
					<div className="mb-4">
						<FormHeader
							navBack={function (): void {
								firstFormActions.mutateState((p) => {
									p.page--;
								});
							}}
							close={function (): void {
								throw new Error("Function not implemented.");
							}}
							heading={"Item"}
							preHeading={"Add"}
						/>
					</div>
					<div className="mb-5">
						<ProgressBar currentStep={state.page + 1} steps={3} />
					</div>
					<div>
						{state.page === 0 && <FirstPart />}
						{state.page === 1 && <SecondPart />}
						{state.page === 2 && <ThirdPart />}
					</div>
				</FormContainer>
			</PopUpContainer>
		</AddItemContext.Provider>
	);
}

export default AddItem;
