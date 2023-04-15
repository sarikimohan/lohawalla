namespace CategorySpecification {
	export interface ItemGridData {
		_id: string;
		srNo: number;
		itemName: {
			name: string;
			imageURL: string;
		};
		itemCode: number;
		entryTime: string;
		rowStatus: {
			isFixed: boolean;
			fixedPosition: number;
		};
	}

	export interface State {
		categoryName: string;
		description: string;
		descriptionLabels: DescriptionLabels[];
		credits: Credit[];
		negotiation: number;
		itemList: ItemGridData[];
    filter: Filter;
    loading: {
      fetchData: AsyncState
    }
	}

	export interface Actions {
		
	}
}
