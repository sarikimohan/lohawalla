namespace CategoryNumberOfItems {
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
		};
		inactiveCompany: string[]; // delete the active company name from it
	}

	interface State {
		grid: GridData[];
		showForm: {
			status: boolean;
			id: string;
		};
		refresh: boolean;
	}
}
