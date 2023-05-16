namespace EditItem {
	interface State {
		itemName: FieldData;
		itemCode: FieldData;
		itemHSNCode: FieldData;
		description: FieldData;

		images: string[];
		imageFiles: File[];

		margin: {
      cash: FieldData,
      online: FieldData;
    };
		descriptionLabels: {
			id:string;
			key: string;
			value: FieldData;
			position: number;
		}[];

		loading: Record<string, AsyncState>;
	}
}

namespace EditItemAsync {
	interface GetEditItemData {
		itemName: string;
		itemCode: string;
		itemHSNCode: number;
		description: string;

		images: string[];
		margin: {
			online: number;
			cash: number;
		};
		descriptionLabels: {
			key: string;
			value: string;
			position: number;
		}[];
	}
}
