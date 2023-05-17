namespace Unit {
	interface State {
		query: string;
		showAddUnitForm: string;
		unitList: {
			srNo: number;
			name: string;
			weight: number;
			entryTime: string;
			categoryCount: number;
			productCount: number;
		}[];
		loading: { [key: string]: AsyncState };
	}

	interface Actions {
		setQuery(d: string);
		saveChanges();
		toggleFormVisibility();
		fetchData();
	}
}
