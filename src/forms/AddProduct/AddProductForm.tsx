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

interface AddProductFormInterface {
	company?: { _id: string; companyName: string };
	item?: { _id: string; name: string };
	categories?: { _id: string; categoryName: string };
}

interface ContextProps {
	state: AddProduct.State;
	addProductActions: FormActions;
	validate: AddProductValidators;
	secondFormActions: SecondFormActions;
	descriptionActions: DescriptionActions;
}

const AddProductContext = React.createContext({} as ContextProps);
export const useAddProductContext = () => useContext(AddProductContext);

function AddProductForm() {
	const [state, setState] = useState<AddProduct.State>({
		page: 0,
		firstForm: {
			companiesList: [],
			categoryList: [],
			itemList: [],
			imageList: null,
			selectedCompany: { value: null },
			selectedCategory: { value: null },
			selectedItem: { value: null },
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
		},
	});
	const { page } = state;

	const addProductActions = new FormActions(state, setState);
	const validate = new AddProductValidators(state, setState);
	const secondFormActions = new SecondFormActions(state, setState);
	const descriptionActions = new DescriptionActions(state, setState);

	console.log(state.firstForm.selectedCompany);

	return (
		<AddProductContext.Provider
			value={{
				state,
				addProductActions,
				validate,
				secondFormActions,
				descriptionActions,
			}}
		>
			<PopUpContainer>
				<FormContainer>
					<div className="mb-4">
						<FormHeader
							navBack={() => {
								if (state.page > 0)
									addProductActions.mutateState((p) => p.page--);
							}}
							heading={"Product"}
							preHeading={"ADD"}
							close={function (): void {
								throw new Error("Function not implemented.");
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
			</PopUpContainer>
		</AddProductContext.Provider>
	);
}

export default AddProductForm;
