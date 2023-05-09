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
		name: string;
		type: PercNum;
		operation: OpType;
	}
	interface State {
		page: number;
		firstForm: FirstFormData;
		images: File[] | null;

		priceStructure: PriceField[];
		tempPriceStructure: NewPriceField[];
		descriptionLabels: DescriptionLabels[];

		loading: {
			savedImages: AsyncState;
			savedData: AsyncState;
		};
	}
}
