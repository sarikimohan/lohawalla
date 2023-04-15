namespace SetBasePrice {
	interface SetCompanyBasePrice {
		srNo: string;
		companyName: {
			_id: string;
			name: string;
			imageURL: string;
		};
		cost: number;
		entryTime: string;
	}

	interface State {
		setList: SetCompanyBasePrice[];
		filter: Filter;
	}
}
