namespace CompanySpecification {
	interface CompanyProduct {
    _id: string;
    srNo: number;
    companyName: {
      imageURL: string;
      name: string;
    };
    companyProductName: string;
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
