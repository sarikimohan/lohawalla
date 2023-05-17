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
import ValidateAddCategory from "./managment/actions/Validate";
import SelectUnitActions from "./managment/actions/SelectUnitActions";
import { FieldDataService } from "@src/modules/FieldData/FieldData";

interface Props {
	onClose: () => void;
	refresh: () => void;
}

interface ContextInterface {
	addCategoryActions: AddCategoryActions;
	setStateActions: SetStateActions;
	state: AddCategory.State;
	descriptionActions: DescriptionActions;
	creditActions: CreditActions;
	saveActions: SaveCategoryActions;
	validate: ValidateAddCategory;
	selectUnitActions: SelectUnitActions;
	refresh: () => void;
	onClose: () => void;
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

function isError(state: { [key: string]: AsyncState }) {
	const values = Object.values(state);
	for (let value of values) {
		if (value.status === "failed") return true;
	}
	return false;
}

function AddCategoryForm(props: Props) {
	const [state, setState] = useState<AddCategory.State>({
		page: 0,
		loading: {
			save: AsyncStateFactory(),
			checkName: AsyncStateFactory(),
			checkCode: AsyncStateFactory(),
		},
		firstForm: {
			categoryName: FieldDataService.getDefaultField(),
			categoryCode: FieldDataService.getDefaultField(),
			description: FieldDataService.getDefaultField(),
			unit: {
				name: "",
				weight: "",
			},
			unitSelect: {
				showDropDown: false,
				list: [
					{
						name: "ton",
						weight: 1000,
					},
					{
						name: "kg",
						weight: 1,
					},
					{
						name: "bundle",
						weight: -1,
					},
					{
						name: "custom",
						weight: -1,
					},
				],
				selected: null,
				showWeightInput: false,
				showUnitNameInput: false,
			},
		},
		images: [],
		credit: [],
		creditInput: {
			key: FieldDataService.getDefaultField(),
			value: FieldDataService.getDefaultField(),
		},
		descriptionLabels: [],
		descriptionEntry: {
			key: FieldDataService.getDefaultField(),
			value: FieldDataService.getDefaultField(),
		},
		negotiation: FieldDataService.getDefaultField(),
	});

	const addCategoryActions = new AddCategoryActions(state, setState);
	const setStateActions = new SetStateActions(state, setState);
	const descriptionActions = new DescriptionActions(state, setState);
	const creditActions = new CreditActions(state, setState);
	const saveActions = new SaveCategoryActions(state, setState);
	const validate = new ValidateAddCategory(state, setState);
	const selectUnitActions = new SelectUnitActions(state, setState);

	return (
		<Context.Provider
			value={{
				state,
				addCategoryActions,
				setStateActions,
				descriptionActions,
				creditActions,
				saveActions,
				validate,
				selectUnitActions,
				refresh: props.refresh,
				onClose: props.onClose,
			}}
		>
			<PopUpContainer>
				{isError(state.loading) ? (
					<ErrorCard
						handleCut={props.onClose}
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
							onClick: props.onClose,
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
								close={props.onClose}
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
