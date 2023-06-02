namespace BrowseProducts {
	interface Entity {
		_id: string;
		name: string;
	}
	interface GridDataFormat {
		srNo: number;
		productName: {
			imgURL: string;
			name: string;
		};
		prodId: string;
		priceStructure: {
			_id: string /*company product price  field*/;
			name: string /*referenced cpfid*/;
			value: FieldData & {hasChanged: boolean} /*cppfid valuelog last value*/;
			isFixed: boolean /*cpfid*/;
			position: number /*cpfid*/;
			type: PercNum /*cpfid*/;
			operation: OpType /*cpfid*/;
			date: string /*cppfid valuelog*/;
		}[];
	}

	interface State {
		companiesList: Entity[];
		categoryList: Entity[];
		itemList: Entity[];
		gridHeader: string[];
		gridData: GridDataFormat[];
		selectedCompany: FieldData<Entity | null>;
		selectedCategory: FieldData<Entity | null>;
		selectedItem: FieldData<Entity | null>;
		showAddForm: boolean;
		refresh: boolean;
	}
}
