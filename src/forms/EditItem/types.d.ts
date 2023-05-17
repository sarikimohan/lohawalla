namespace EditItem {
	interface State {
		itemName: string;
		itemCode: string;
		itemHSNCode: string;
		description: string;

		images: string[];
		imageFiles: File[];

		margin: {
      cash: string,
      online: string;
    };
		descriptionLabels: {
			key: string;
			value: string;
			position: number;
		}[];

		loading: Record<string, AsyncState>;
		validation: boolean;
		triggerSubmit: boolean;
		validationCount: number;
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
