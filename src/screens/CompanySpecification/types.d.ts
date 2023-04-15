namespace CompanySpecification {
	interface CompanyProduct {
		_id: string;
		srNo: number;
		companyName: {
			imageURL: string;
			name: string;
		};
		price: number;
		entryTime: string;
		noOfProducts: number;
	}

	interface State {
		companyName: string;
		description: string;
		descriptionLabels: DescriptionLabels[];
		priceStructure: PriceField[];
		companyList: CompanyProduct[];
		filter: Filter;
	}
}
