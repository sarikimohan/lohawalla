namespace EditItem {
	interface State {
		itemName: IStringValueChange;
		itemCode: IStringValueChange;
		itemHSNCode: string;
		description: string;

		images: {link: string, deleted: boolean}[];

		imageFiles: File[] | null;

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
