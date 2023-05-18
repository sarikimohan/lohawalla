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

			selectedCompany: FieldData<Entity | null>;
			selectedCategory: FieldData<Entity | null>;
			selectedItem: FieldData<Entity | null>;

			disableUnitSelection: boolean;
			unitList: {
				id: string;
				name: string;
				weight: number;
			}[];
			unit: {
				id: string;
				name: string;
				weight: number;
			} | null;
			unitWeightInputField: FieldData;
			unitValidationVerdict: boolean;
		};

		secondForm: {
			hasVisited: boolean;
			priceStructure: {
				_id: string;
				name: string;
				value: FieldData;
				isFixed: boolean;
				position: number;
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
		loading: Record<string, AsyncState>;
	}
}
