namespace EditCompany {
	interface NewPriceField {
		id: string;
		name: FieldData;
		type: PercNum;
		operation: OpType;
	}

	interface State {
		companyName: IStringValueChange;
		description: string;
		images: {link: string, deleted: boolean}[];
		imageFiles: File[] | null;
		priceStructure: {
			_id: string;
			name: string;
			value: string;
			isFixed: boolean;
			type: PercNum;
			operation: OpType;
			wasAdded?: boolean; 
		}[];
		deletedId: string[];
		tempPriceFields: NewPriceField[];
		descriptionLabels: {
			id: string;
			key: string;
			value: string;
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
