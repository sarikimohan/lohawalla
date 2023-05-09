namespace AddCompany {
	interface FieldData {
		/**
		 * the value of the field
		 */
		value: string;
		/**
		 * if there is an error during validation
		 */
		error?: string;
		/**
		 * after validtion, if it is okay
		 */
		isValid?: boolean;
	}

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
		name: string;
		type: "numeric" | "percentage";
		operation: "subtract" | "add";
		value: FieldData;
		fixed: boolean;
	}

	interface DescriptionLabels {
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

		loading: {
			savedImages: AsyncState;
			savedData: AsyncState;
		};
	}
}
