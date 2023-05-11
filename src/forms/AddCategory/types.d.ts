namespace AddCategory {
	interface DescriptionLabels {
		id: string;
		key: string;
		value: FieldData;
	}

	interface State {
		firstForm: FirstFormState;

		images: File[] | null;

		credit: {
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

		loading: {
			saveImage: AsyncState;
			saveData: AsyncState;
		};
	}

	interface FirstFormState {
		categoryName: FieldData;
		categoryCode: FieldData;
		description: FieldData;
		unit: FieldData;
	}
	interface ThirdFormState {
		descriptionLabels: DescriptionLabels[];
	}

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
