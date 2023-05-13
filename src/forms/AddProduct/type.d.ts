namespace AddProduct {
	interface Entity {
		_id: string;
		name: string;
	}
	interface State {
		page: number;

		firstForm: {
			companiesList: Entity[];
			categoryList: Entity[];
			itemList: Entity[];
			imageList: File[] | null;

			selectedCompany: Entity | null;
			selectedCategory: Entity | null;
			selectedItem: Entity | null;
		};

		secondForm: {
			priceStructure: {
				_id: string;
				name: string;
				value: number;
				isFixed: boolean;
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
		};

		thirdForm: {
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
		};
		loading: {
			save: AsyncState;
		};
	}
}
