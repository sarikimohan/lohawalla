namespace SetActiveCompany {
	interface State {
		activeCompany: {
			name: string;
			_id: string;
		};
		inActiveCompanies: {
			_id: string;
			name: string;
		}[];
	}
}
