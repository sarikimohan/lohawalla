import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React, { useContext, useState } from "react";
import { Context } from "vm";
import { InitialState } from "./managment/state/initialState";
import FirstFormActions from "./managment/actions/FirstFormActions";
import FirstPart from "./parts/FirstPart/FirstPart";

interface ContextProps {
	firstFormActions: FirstFormActions;
	state: AddItem.State;
}

const AddItemContext = React.createContext({} as ContextProps);
export const useAddItemContext = () => useContext(AddItemContext);

function AddItem() {
	const [state, setState] = useState<AddItem.State>(InitialState);
	const firstFormActions = new FirstFormActions(state, setState);

	return (
		<AddItemContext.Provider
			value={{
				state,
				firstFormActions,
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
					<div>{state.page === 0 && <FirstPart />}</div>
				</FormContainer>
			</PopUpContainer>
		</AddItemContext.Provider>
	);
}

export default AddItem;
