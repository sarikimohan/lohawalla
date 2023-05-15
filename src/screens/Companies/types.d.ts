namespace Companies {
	export interface CompanyListRow {
		_id: string;
		srNo: number;
		companyName: {
			imageURL: string;
			name: string;
		};
		price: number;
		entryTime: string;
		noOfProducts: number;
		rowStatus: RowStatus;
	}

	interface State {
		companyList: CompanyListRow[];
		filter: Filter;
		loading: { [key: string]: AsyncState };
	}

	interface Actions {
		CompanyListRow(): void;
		filterCompanylistRow(): CompanyListRow[];
		setQuery(query: string): void;
	}
}
