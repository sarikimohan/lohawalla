import React, { useContext, useEffect, useState } from "react";
import FormPart1 from "./parts/FormPart1/FormPart1";
import FormPart2 from "./parts/FormPart2/FormPart2";
import FormPart3 from "./parts/FormPart3/FormPart3";
import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import FormHeader from "@src/Components/common/FormHeader/FormHeader";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import InitialState from "./management/state/InitialState";
import { FieldDataService } from "@src/modules/FieldData/FieldData";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import FormActions, {
	SecondFormActions,
} from "./management/actions/FormActions";
import AddProductValidators from "./management/actions/Validator";
import DescriptionActions from "./management/actions/DescriptionActions";
import ErrorBoundary from "@src/Components/feedback/ErrorBoundary/ErrorBoundary";
import AsyncProcessBoundary from "@src/Components/feedback/AsyncProcessBoundary/AsyncProcessBoundary";

export interface AddProductAutoConfig {
	company?: { _id: string; name: string };
	item?: { _id: string; name: string };
	category?: { _id: string; name: string };
}

interface ContextProps {
	state: AddProduct.State;
	addProductActions: FormActions;
	validate: AddProductValidators;
	secondFormActions: SecondFormActions;
	descriptionActions: DescriptionActions;
	close: () => void;
	refresh: () => void;
	preSelected: AddProductAutoConfig;
}

interface RIAddProductForm {
	selected?: AddProductAutoConfig;
	close: () => void;
	refresh: () => void;
}

const AddProductContext = React.createContext({} as ContextProps);
export const useAddProductContext = () => useContext(AddProductContext);

function AddProductForm(props: RIAddProductForm) {
	const preSelected = props.selected ? props.selected : {};

	const [state, setState] = useState<AddProduct.State>({
		page: 0,
		firstForm: {
			uniqueError: "",
			companiesList: [],
			categoryList: [],
			itemList: [],
			imageList: null,
			selectedCompany: {
				value: preSelected.company ? preSelected.company : null,
			},
			selectedCategory: {
				value: preSelected.category ? preSelected.category : null,
			},
			selectedItem: { value: preSelected.item ? preSelected.item : null },
			unitWeightInputField: { value: "" },
			unitValidationVerdict: true,
		},
		secondForm: {
			hasVisited: false,
			priceStructure: [],
			margin: {
				online: 0,
				cash: 0,
			},
			credits: [],
			negotiation: 0,
			gst: {
				type: "percentage",
				value: FieldDataService.getDefaultField(),
			},
		},
		thirdForm: {
			description: FieldDataService.getDefaultField(),
			descriptionLabels: [],
			descriptionEntry: {
				key: FieldDataService.getDefaultField(),
				value: FieldDataService.getDefaultField(),
			},
		},
		loading: {
			save: AsyncStateFactory(),
			fetchCompanies: AsyncStateFactory(),
			fetchCategories: AsyncStateFactory(),
			fetchItems: AsyncStateFactory(),
			fetchUnits: AsyncStateFactory(),
			fetchDefaultUnit: AsyncStateFactory(),
			checkUnique: AsyncStateFactory(),
		},
	});

	const { page } = state;

	const addProductActions = new FormActions(state, setState);
	const validate = new AddProductValidators(state, setState);
	const secondFormActions = new SecondFormActions(state, setState);
	const descriptionActions = new DescriptionActions(state, setState);

	return (
		<AddProductContext.Provider
			value={{
				state,
				addProductActions,
				validate,
				secondFormActions,
				descriptionActions,
				close: props.close,
				refresh: props.refresh,
				preSelected,
			}}
		>
			<PopUpContainer zIndex={1000}>
				<AsyncProcessBoundary
					asyncStates={[
						state.loading.fetchCompanies,
						state.loading.fetchCategories,
						state.loading.fetchItems,
						state.loading.fetchUnits,
					]}
					primaryAction={{
						onClick: () => {
							props.close();
							props.refresh();
						},
						label: "Close",
					}}
				>
					<FormContainer>
						<div className="mb-4">
							<FormHeader
								navBack={() => {
									if (state.page > 0)
										addProductActions.mutateState((p) => p.page--);
									if (state.page === 0) {
										props.close();
									}
								}}
								heading={"Product"}
								preHeading={"ADD"}
								close={function (): void {
									props.close();
								}}
							/>
						</div>
						<div className="mb-5">
							<ProgressBar currentStep={page + 1} steps={3} />
						</div>
						<div>
							{page === 0 && <FormPart1 />}
							{page === 1 && <FormPart2 />}
							{page === 2 && <FormPart3 />}
						</div>
					</FormContainer>
				</AsyncProcessBoundary>
			</PopUpContainer>
		</AddProductContext.Provider>
	);
}

export default AddProductForm;
