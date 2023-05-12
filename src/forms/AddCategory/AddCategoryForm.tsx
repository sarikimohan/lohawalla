import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import FormHeader from "@src/Components/common/FormHeader/FormHeader";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import React, { useContext, useState } from "react";
import { InitialState } from "./managment/state/initialState";
import FirstPart from "./parts/FirstPart/FirstPart";
import AddCategoryActions from "./managment/actions/AddCategoryActions";
import SetStateActions from "./managment/actions/SetStateActions";
import SecondPart from "./parts/SecondPart/SecondPart";
import ThirdPart from "./parts/ThirdPart/ThirdPart";
import DescriptionActions from "./managment/actions/DescriptionActions";
import CreditActions from "./managment/actions/CreditActions";
import SaveCategoryActions from "./managment/actions/SaveCategoryActions";
import ErrorCard from "@src/Components/feedback/ErrorCard/ErrorCard";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

interface ContextInterface {
	addCategoryActions: AddCategoryActions;
	setStateActions: SetStateActions;
	state: AddCategory.State;
	descriptionActions: DescriptionActions;
	creditActions: CreditActions;
	saveActions: SaveCategoryActions;
}
const Context = React.createContext<ContextInterface>({} as ContextInterface);

export function useAddCategoryContext() {
	return useContext(Context);
}

function Mapper() {
	const { state } = useAddCategoryContext();
	return (
		<>
			{state.page === 0 && <FirstPart />}
			{state.page === 1 && <SecondPart />}
			{state.page === 2 && <ThirdPart />}
		</>
	);
}

function AddCategoryForm() {
	const [state, setState] = useState(InitialState);

	const addCategoryActions = new AddCategoryActions(state, setState);
	const setStateActions = new SetStateActions(state, setState);
	const descriptionActions = new DescriptionActions(state, setState);
	const creditActions = new CreditActions(state, setState);
	const saveActions = new SaveCategoryActions(state, setState);

	return (
		<Context.Provider
			value={{
				state,
				addCategoryActions,
				setStateActions,
				descriptionActions,
				creditActions,
				saveActions,
			}}
		>
			<PopUpContainer>
				{state.loading.save.status === "failed" ? (
					<ErrorCard
						messages={[state.loading.save.message]}
						primaryAction={{
							onClick: () => {
								addCategoryActions.mutateState((p) => {
									p.page = 0;
									p.loading.save = AsyncStateFactory();
								});
							},
							label: "Retry",
						}}
						secondaryAction={{
							label: "Close",
						}}
					/>
				) : (
					<FormContainer>
						<div className="mb-4">
							<FormHeader
								navBack={() => {
									addCategoryActions.mutateState((p) => {
										if (p.page > 0) p.page--;
									});
								}}
								close={() => {}}
								heading={"Category"}
								preHeading={"ADD"}
							/>
						</div>

						<div className="mb-5">
							<ProgressBar currentStep={state.page + 1} steps={3} />
						</div>
						<Mapper />
					</FormContainer>
				)}
			</PopUpContainer>
		</Context.Provider>
	);
}

export default AddCategoryForm;
