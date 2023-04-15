namespace Companies {
	interface CompanyListRow {
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
		companyList: CompanyListRow[];
		filter: Filter;
	}
}
