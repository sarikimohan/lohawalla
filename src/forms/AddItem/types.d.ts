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
		images: File[] | null;
		margin: {
			online: FieldData;
			cash: FieldData;
		};
		description: FieldData;
		descriptionLabels: DescriptionLabels[];

		descriptionEntry: {
			key: FieldData;
			value: FieldData;
		};

		unitList: {
			id: string;
			name: string;
			weight: number | null;
		}[];
		unit: {
			id: string;
			name: string;
			weight: number | null;
			value: string | null;
		} | null;

		loading: { [key: string]: AsyncState };
	}
}
