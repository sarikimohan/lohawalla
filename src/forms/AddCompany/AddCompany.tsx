import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React, { useContext, useState } from "react";
import AddCompanyActions from "./managment/actions/AddCompanyActions";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import FirstPart from "./parts/FirstPart/FirstPart";
import FirstFormActions from "./managment/actions/FirstFormActions";
import SecondPart from "./parts/SecondPart/SecondPart";
import SecondFormActions from "./managment/actions/SecondFormActions";
import ThirdFormActions from "./managment/actions/ThirdFormActions";
import ThirdPart from "./parts/ThirdPart/ThirdPart";
import SaveFormActions from "./managment/actions/SaveFormAction";
import ValidateAddCompany from "./managment/actions/Validate";
import { nanoid } from "nanoid";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import ErrorCard from "@src/Components/feedback/ErrorCard/ErrorCard";

interface Props {
	close: FTN;
	refresh: FTN;
}
interface ContextProps {
	state: AddCompany.State;
	addCompanyActions: AddCompanyActions;
	firstFormActions: FirstFormActions;
	secondFormActions: SecondFormActions;
	thirdFormActions: ThirdFormActions;
	saveFormActions: SaveFormActions;
	validate: ValidateAddCompany;
	refresh: FTN;
	close: FTN;
}

const AddCompanyContext = React.createContext({} as ContextProps);

export const useAddCompanyContext = () => useContext(AddCompanyContext);

export default function AddCompany(props: Props) {
	const [state, setState] = useState<AddCompany.State>({
		page: 0,
		firstForm: { companyName: { value: "" }, description: { value: "" } },
		images: null,
		priceStructure: [
			{
				id: nanoid(),
				name: "basic rate",
				type: "numeric",
				operation: "add",
				value: {
					value: "",
				},
				fixed: true,
			},
		],
		tempPriceStructure: [
			{
				id: nanoid(),
				name: { value: "" },
				type: "numeric",
				operation: "add",
			},
		],
		descriptionLabels: [],
		loading: {
			save: AsyncStateFactory(),
			checkName: AsyncStateFactory(),
		},
		descriptionEntry: {
			key: { value: "" },
			value: { value: "" },
		},
	});

	const addCompanyActions = new AddCompanyActions(state, setState);
	const firstFormActions = new FirstFormActions(state, setState);
	const secondFormActions = new SecondFormActions(state, setState);
	const thirdFormActions = new ThirdFormActions(state, setState);
	const saveFormActions = new SaveFormActions(state, setState);
	const validate = new ValidateAddCompany(state, setState);

	return (
		<AddCompanyContext.Provider
			value={{
				state,
				addCompanyActions,
				firstFormActions,
				secondFormActions,
				thirdFormActions,
				saveFormActions,
				validate,
				refresh: props.refresh,
				close: props.close,
			}}
		>
			<PopUpContainer>
				{state.loading.save.status === "failed" ? (
					<ErrorCard
						messages={[state.loading.save.message]}
						primaryAction={{
							onClick: props.close,
							label: "Close",
						}}
					/>
				) : (
					<FormContainer>
						<div className="mb-4">
							<FormHeader
								navBack={function (): void {
									addCompanyActions.navBack(props.close);
								}}
								close={props.close}
								heading={"Company"}
								preHeading={"Add"}
							/>
						</div>
						<div className="mb-5">
							<ProgressBar currentStep={state.page + 1} steps={3} />
						</div>
						<div className="mb-4">
							{state.page === 0 && <FirstPart />}
							{state.page === 1 && <SecondPart />}
							{state.page === 2 && <ThirdPart />}
						</div>
					</FormContainer>
				)}
			</PopUpContainer>
		</AddCompanyContext.Provider>
	);
}
