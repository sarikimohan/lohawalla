namespace EditCompany {
	interface State {
		companyName: string;
		description: string;
		images: string[];
		priceStructure: {
			_id: string;
			name: string;
			value: string;
			position: number;
			isFixed: boolean;
			type: PercNum;
			operation: OpType;
			wasAdded?: boolean;
		}[];
		deletedId: string[];
		descriptionLabels: {
			id: string;
			key: string;
			value: string;
			position: number;
		}[];
		descriptionEntry: {
			key: string;
			value: string;
		};
	}

	interface Actions {
		fetch();
		save();

		setPfValue();
		setPfFixed();
		deletePf();
	}
}
