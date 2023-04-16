import React, { useContext, useState } from "react";
import { InitialState } from "../state/initialState";
import AddCategoryActions from "../actions/AddCategoryActions";
import SetStateActions from "../actions/SetStateActions";

interface ContextInterface {
	addCategoryActions: AddCategoryActions;
	setStateActions: SetStateActions;
	state: AddCategory.State;
}
const Context = React.createContext<ContextInterface>({} as ContextInterface);

export function useAddCategoryContext() {
	return useContext(Context);
}

function AddCategoryContext(props: { children: React.ReactNode }) {
	const [state, setState] = useState(InitialState);

	const addCategoryActions = new AddCategoryActions(state, setState);
	const setStateActions = new SetStateActions(state, setState);

	return (
		<Context.Provider value={{ addCategoryActions, setStateActions, state }}>
			{props.children}
		</Context.Provider>
	);
}

export default AddCategoryContext;
