namespace BrowseProducts {
  interface Entity {
		_id: string;
		name: string;
	}
  interface State {
    companiesList: Entity[];
    categoryList: Entity[];
    itemList: Entity[];

    selectedCompany: FieldData<Entity | null>;
    selectedCategory: FieldData<Entity | null>;
    selectedItem: FieldData<Entity | null>;
  }
}