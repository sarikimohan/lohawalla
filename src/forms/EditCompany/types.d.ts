namespace EditCompany {
	interface State {
		companyName: string;
		description: string;
		priceStructure: {
			_id: string;
			name: string;
			value: string;
			position: number;
			isFixed: boolean;
			type: PercNum;
			operation: OpType;
		}[];
		descriptionLabels: {
			id: string;
			key: string;
			value: string;
			position: number;
		}[];
		descriptionEntry: {
			key: string;
			value: string;
		}
	}
}
