namespace CompanyProducts {
	interface CompanyProduct {
		_id: string;
		srNo: number;
		companyName: {
			imageURL: string;
			name: string;
		};
		ProductName: string;
		productId: string;
		entryTime: string;
	}
	interface State {
		products: CompanyProduct[];
		filter: Filter;
		loading:{[key:string]:AsyncState}
	}

	interface Actions {
		setQuery(query: string): void;
		fetchProducts(id: string): void;
		getFilteredList(): CompanyProduct[];
	}
}
