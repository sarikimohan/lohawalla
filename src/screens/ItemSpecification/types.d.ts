namespace ItemSpecification {
	interface CompanyProduct {
		_id: string;
		srNo: number;
		company: {
			name: string;
			imageURL: string;
		};
		companyProductName: string;
	}

	interface State {
		itemName: string;
		categoryName: string;
		description: string;
		descriptionLabels: DescriptionLabels[];
		margin: Margin;
		gst: GSTDetails;
		companyProductList: CompanyProduct[];
		filter: Filter;
		images: string[];

		loading: {
			fetch: AsyncState
		}
	}

	interface Actions {
		setQuery(query: string): void;
		getFilteredList(): CompanyProduct[];
		fetch(id: string): void;
	}
}
