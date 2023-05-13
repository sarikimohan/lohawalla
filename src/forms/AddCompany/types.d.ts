namespace AddCompany {
	interface FirstFormData {
		companyName: FieldData;
		description: FieldData;
	}
	interface NewPriceField {
		id: string;
		name: FieldData;
		type: PercNum;
		operation: OpType;
	}
	interface FormPriceField {
		id: string;
		name: string;
		type: "numeric" | "percentage";
		operation: "subtract" | "add";
		value: FieldData;
		fixed: boolean;
	}

	interface DescriptionLabels {
		id: string;
		key: string;
		value: FieldData;
	}
	interface State {
		page: number;
		firstForm: FirstFormData;
		images: File[] | null;

		priceStructure: FormPriceField[];
		tempPriceStructure: NewPriceField[];
		descriptionLabels: DescriptionLabels[];

		descriptionEntry: {
			key: FieldData;
			value: FieldData;
		};

		loading: {
			save: AsyncState;
		};
	}
}
