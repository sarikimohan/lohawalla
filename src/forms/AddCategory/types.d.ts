namespace AddCategory {
	interface State {
		firstForm: FirstFormState;

		images: File[] | null;

		secondForm: SecondFormState;

		thirdForm: ThirdFormState;

		page: number;

		loading: {
			saveImage: AsyncState;
			saveData: AsyncState;
		};
	}

	interface FirstFormState {
		categoryName: string;
		categoryCode: string;
		description: string;
		unit: string;
	}
	interface SecondFormState {
		credit: Credit[];
		negotiation: number;
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
