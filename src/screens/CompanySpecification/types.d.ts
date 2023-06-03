namespace CompanySpecification {
	interface CompanyProduct {
		_id: string;
		srNo: number;
		company: {
			imageURL: string;
			name: string;
		};
		companyProductName: string;
	}

	interface State {
		companyName: string;
		description: string;
		descriptionLabels: DescriptionLabels[];
		priceStructure: {
			name: string;
			value: number;
			type: PercNum;
			operation: OpType;
			position: number;
			fixed: boolean;
		}[];
		companyList: CompanyProduct[];
		filter: Filter;
		images: string[];
		loading: {
			fetch: AsyncState;
			fetchList: AsyncState;
		};
		show: boolean;
		refresh: boolean;
		showEditForm: boolean;
	}

	interface Actions {
		fetch(id: string): void;
		filter(): CompanyProduct[];
		setQuery(query: string): void;
	}
}
