namespace SetBasePrice {
	interface SetCompanyBasePrice {
		srNo: string;
		companyName: {
			_id: string;
			name: string;
			imageURL: string;
		};
		cost: string;
		entryTime: string;
	}

	interface State {
		setList: SetCompanyBasePrice[];
		filter: Filter;
		loading: {
			fetch: AsyncState;
		};
	}

	interface Actions {
		fetch();
		setQuery(query: string);
		filter(): SetCompanyBasePrice[];
	}
}
