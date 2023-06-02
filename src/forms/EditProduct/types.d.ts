namespace EditProduct {
	interface State {
		selectedCompany: string;
		selectedCategory: string;
		selectedItem: string;

		images: { link: string; deleted: boolean }[];

		imageFiles: File[] | null;

		priceStructure: {
			_id: string;
			name: string;
			value: FieldData & { hasChanged: boolean };
			isFixed: boolean;
			type: PercNum;
			operation: OpType;
		}[];
		margin: {
			online: number;
			cash: number;
		};

		credits: { day: number; isNumeric: boolean; value: number }[];

		negotiation: number;

		gst: {
			type: PercNum;
			value: FieldData;
		};

		description: FieldData;
		descriptionLabels: {
			id: string;
			key: string;
			value: FieldData;
		}[];

		descriptionEntry: {
			key: FieldData;
			value: FieldData;
		};

		loading: Record<string, AsyncState>;
	}
}
