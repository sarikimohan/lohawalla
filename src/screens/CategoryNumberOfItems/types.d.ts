namespace CategoryNumberOfItems {
	interface Entity {
		name: string;
		id: string;
	}
	interface GridData {
		_id: string;
		srNo: number;
		itemName: {
			name: string;
			images: string;
		};
		price: number;
		numberOfCompanies: number;
		activeCompany: {
			name: string;
			id: string;
		} | null;
		inactiveCompany: { name: string; id: string }[]; // delete the active company name from it
	}

	interface State {
		grid: GridData[];
		showForm: {
			status: boolean;
			id: string;
			activeCompany: { id: string; name: string } | null;
			inActiveCompanies: { id: string; name: string }[];
		};
		refresh: boolean;
		showAddItem: boolean;
		query: string;
	}
}
