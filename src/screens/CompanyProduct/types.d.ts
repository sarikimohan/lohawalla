namespace CompanyProducts {
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
		products: CompanyProduct[];
		filter: Filter;
		loading: {
			fetch: AsyncState;
		};
	}

	interface Actions {
		setQuery(query: string): void;
		fetchProducts(id: string): void;
		getFilteredList(): CompanyProduct[];
	}
}
