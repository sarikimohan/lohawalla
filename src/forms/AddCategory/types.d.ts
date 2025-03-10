namespace AddCategory {
	//* state
	interface DescriptionLabels {
		id: string;
		key: string;
		value: FieldData;
	}

	interface Unit {
		name: string;
		weight: number;
	}

	interface State {
		firstForm: FirstFormState;

		images: File[] | null;

		credit: {
			id: string;
			days: number;
			value: FieldData;
			type: PercNum;
		}[];
		negotiation: FieldData;
		creditInput: {
			key: FieldData;
			value: FieldData;
		};

		descriptionLabels: DescriptionLabels[];

		descriptionEntry: {
			key: FieldData;
			value: FieldData;
		};

		page: number;

		loading: Record<string, AsyncState>;
	}

	interface FirstFormState {
		categoryName: FieldData;
		categoryCode: FieldData;
		description: FieldData;
		showUnitWeightInput: boolean;
		unitWeightInputField: FieldData;
	}
	interface ThirdFormState {
		descriptionLabels: DescriptionLabels[];
	}

	//* actions
	interface Actions {
		navFront();
		navBack();
		submit();
	}

	interface StateSettingActions {
		setFirstForm(data: FirstFormState);
		setSecondForm(data: SecondFormState);
		setThridForm(data: ThirdFormState);
	}

	interface SubmitForm {
		submitForm();
	}
}

//* actions
namespace AddCategoryAsync {
	interface CreditData {
		days: number;
		value: number;
		type: PercNum;
	}
	interface DescriptionData {
		key: string;
		value: string;
		position: number;
	}
	interface FormData {
		name: string;
		code: string;
		description: string;
		credit: CreditData[];
		negotiation: number;
		descriptionLabels: DescriptionData[];
		by: NameIdPair;
		images: string[];
	}

	interface IsUnique {
		isUnique: boolean;
	}
}
