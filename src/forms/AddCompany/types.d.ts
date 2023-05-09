namespace AddCompany {
	interface FirstFormData {
		companyName: string;
		description: string;
	}
	interface NewPriceField {
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
