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
		companyProductList: CompanyProduct[];
		filter: Filter;
		images: string[];

		loading: {
			fetch: AsyncState;
		};
	}

	interface Actions {
		setQuery(query: string): void;
		getFilteredList(): CompanyProduct[];
		fetch(id: string): void;
	}
}

namespace ItemSpecAsync {
	interface ItemSpecificationData {
		itemName: string;
		categoryName: string;
		description: string;
		descriptionLabels: {
			key: string;
			value: string;
			position: number;
		}[];
		margin: {
			online: number;
			cash: number;
		};
		images: string[];
	}
}
