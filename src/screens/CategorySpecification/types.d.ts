namespace CategorySpecification {
  export interface CategorySpecifications {
		categoryName: "",
		description: "",
		descriptionLabels: [],
		creditDetails: [],
		negotiationDetails: 0,
		images: [],
	};
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
		images: string[];
    loading: {
      fetchData: AsyncState
    }
	}

	export interface Actions {
		fetchData(id: string): void;
		filterList(): ItemGridData[];
		setQuery(query: string): void;
		toggleFilter(id: string): void;
	}
}
