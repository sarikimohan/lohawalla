namespace AddCompany {
	interface State {
		companyName: string;
		description: string;
		images: string[];
		
		priceStructure: PriceField[];
		tempPriceStructure: PriceField[];
		descriptionLabels: DescriptionLabels[];
		
		loading: {
			savedImages: AsyncState;
			savedData: AsyncState;
		}
		
	}
}