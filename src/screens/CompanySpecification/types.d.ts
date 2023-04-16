namespace CompanySpecification {
	interface CompanyProduct {
    _id: string;
    srNo: number;
    company: {
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
		loading: {
			fetch: AsyncState
		}
	}

	interface Actions {
		fetch(id: string): void;
		filter(): CompanyProduct[];
		setQuery(query: string): void;
	}
}
