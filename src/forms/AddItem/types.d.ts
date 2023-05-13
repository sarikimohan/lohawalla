namespace AddItem {
	interface DescriptionLabels {
		id: string;
		key: string;
		value: FieldData;
	}
	interface State {
		page: number;
		itemName: FieldData;
		itemHSNCode: FieldData;
		itemCode: FieldData;
		images: string[];
		margin: {
			online: FieldData,
			cash: FieldData
		};
		description: FieldData;
		descriptionLabels: DescriptionLabels[];

		descriptionEntry: {
			key: FieldData;
			value: FieldData;
		};
		
		loading: {
			save: AsyncState
		};
	}
}
