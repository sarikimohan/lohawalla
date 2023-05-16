namespace EditCategory {
	type ModifyStatus = "initial" | "modified" | "added" | "deleted";

	interface DescriptionLabels {
		id: string;
		key: string;
		value: FieldData;
	}

	interface State {
		page: number;
		negotiation: FieldData;
		unit: FieldData;
		categoryName: FieldData;
		categoryCode: FieldData;
		description: FieldData;
		images: string[];
		imageFiles: File[]|null;
		credit: {
			days: number;
			value: FieldData;
			type: PercNum;
		}[];
		creditInput: {
			key: FieldData;
			value: FieldData;
		};

		descriptionLabels: DescriptionLabels[];

		descriptionEntry: {
			key: FieldData;
			value: FieldData;
		};

		loading: {
			saveImages: AsyncState;
			saveData: AsyncState;
		};
	}
}
