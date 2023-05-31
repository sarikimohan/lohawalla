import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React, { useContext, useEffect, useState } from "react";
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
import Validate from "./managment/actions/Validate";
import ErrorCard from "@src/Components/feedback/ErrorCard/ErrorCard";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import AsyncSnackBar from "@src/Components/feedback/AsyncSnackBar/AsyncSnackBar";

interface ContextProps {
	firstFormActions: FirstFormActions;
	secondFormActions: SecondFormActions;
	descriptionActions: DescriptionActions;
	state: AddItem.State;
	saveFormAction: SubmitActions;
	validate: Validate;
}

interface Props {
	onClose: () => void;
	refresh: () => void;
	categoryId: string;
}

const AddItemContext = React.createContext({} as ContextProps & Props);
export const useAddItemContext = () => useContext(AddItemContext);

function AddItem(props: Props) {
	const [state, setState] = useState<AddItem.State>({
		page: 0,
		itemName: { value: "" },
		itemHSNCode: { value: "" },
		itemCode: { value: "" },
		images: [],
		margin: {
			online: { value: "" },
			cash: { value: "" },
		},
		description: { value: "" },
		descriptionLabels: [],
		loading: {
			save: AsyncStateFactory(),
			saveImages: AsyncStateFactory(),
			checkName: AsyncStateFactory(),
			checkCode: AsyncStateFactory(),
		},
		descriptionEntry: {
			key: { value: "" },
			value: { value: "" },
		},
		unitList: [],
		unit: null,
	});
	const firstFormActions = new FirstFormActions(state, setState);
	const secondFormActions = new SecondFormActions(state, setState);
	const descriptionActions = new DescriptionActions(state, setState);
	const saveFormAction = new SubmitActions(state, setState);
	const validate = new Validate(state, setState);

	useEffect(() => {
		saveFormAction.fetchAllUnits();
	}, []);

	return (
		<AddItemContext.Provider
			value={{
				state,
				firstFormActions,
				secondFormActions,
				descriptionActions,
				saveFormAction,
				validate,
				...props,
			}}
		>
			<PopUpContainer>
				{state.loading.save.status === "failed" ? (
					<ErrorCard
						messages={[state.loading.save.message]}
						primaryAction={{
							onClick: props.onClose,
							label: "Close",
						}}
					/>
				) : (
					<FormContainer>
						<div className="mb-4">
							<FormHeader
								navBack={function (): void {
									firstFormActions.mutateState((p) => {
										if (p.page > 0) p.page--;
									});
								}}
								close={function (): void {
									props.onClose();
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
				)}
				<AsyncSnackBar asyncState={state.loading.saveImages} />
				<AsyncSnackBar asyncState={state.loading.save} />
			</PopUpContainer>
		</AddItemContext.Provider>
	);
}

export default AddItem;
