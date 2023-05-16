namespace SetBasePrice {
	interface SetCompanyBasePrice {
		srNo: number;
		companyName: {
			name: string;
			imageURL: string;
		};
		companyId: string /*to nav to company*/;
		priceFieldId: string /*to save in price field*/;
		cost: /*basic rate (value log)*/ FieldData;
		entryTime: /* (value log) */ string;
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
