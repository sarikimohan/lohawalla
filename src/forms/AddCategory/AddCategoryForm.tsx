import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import FormHeader from "@src/Components/common/FormHeader/FormHeader";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import React, { useContext, useState } from "react";
import { InitialState } from "./managment/state/initialState";
import FirstPart from "./parts/FirstPart/FirstPart";
import AddCategoryActions from "./managment/actions/AddCategoryActions";
import SetStateActions from "./managment/actions/SetStateActions";

interface ContextInterface {
	addCategoryActions: AddCategoryActions;
	setStateActions: SetStateActions;
	state: AddCategory.State;
}
const Context = React.createContext<ContextInterface>({} as ContextInterface);

export function useAddCategoryContext() {
	return useContext(Context);
}

function Mapper() {
	const { state } = useAddCategoryContext();
	return <>{state.page === 0 && <FirstPart />}</>;
}

function AddCategoryForm() {
	const [state, setState] = useState(InitialState);

	const addCategoryActions = new AddCategoryActions(state, setState);
	const setStateActions = new SetStateActions(state, setState);

	return (
		<Context.Provider value={{ state, addCategoryActions, setStateActions }}>
			<PopUpContainer>
				<FormContainer>
					<div className="mb-4">
						<FormHeader
							navBack={() => {
								addCategoryActions.navBack();
							}}
							close={() => {}}
							heading={"Product"}
							preHeading={"ADD"}
						/>
					</div>

					<div className="mb-5">
						<ProgressBar currentStep={1} steps={3} />
					</div>
					<Mapper />
				</FormContainer>
			</PopUpContainer>
		</Context.Provider>
	);
}

export default AddCategoryForm;
