namespace Unit {
	interface UnitListItem {
		srNo: number;
		name: string;
		weight: number;
		categoryCount: number;
		productCount: number;
	}
	interface State {
		query: string;
		showAddUnitForm: boolean;
		refresh: boolean;
		unitList: UnitListItem[];
		loading: { [key: string]: AsyncState };
	}

	interface Actions {
		setQuery(d: string);
		saveChanges();
		toggleFormVisibility();
		fetchData();
	}
}
