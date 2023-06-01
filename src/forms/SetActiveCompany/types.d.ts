namespace SetActiveCompany {
	interface Entity {
		name: string;
		id: string;
	}
	interface State {
		query: string;
		activeCompany: Entity | null;
		inActiveCompanies: Entity[];
		loading: Record<string, AsyncState>;
	}
}
