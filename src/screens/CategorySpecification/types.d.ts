namespace CategorySpecification {
	interface ItemGridData {
		_id: string;
		srNo: number;
		itemName: {
			name: string;
			imageURL: string;
		};
		itemCode: string;
		entryTime: string;
		rowStatus: RowStatus;
	}

	interface CategorySpecData {
		_id: string;
		name: string;
		description: string;
		descriptionLabels: DescriptionLabels[];
		credit: Credit[];
		negotiation: number;
		images: string[];
	}

	interface State {
		categorySpec: CategorySpecData;
		itemList: ItemGridData[];
		filter: Filter;
		loading: { [key: string]: AsyncState };
	}

	interface Actions {
		fetchData(id: string): void;
		filterList(): ItemGridData[];
		setQuery(query: string): void;
		toggleFilter(id: string): void;
	}
}

namespace CategorySpecAsync {
	interface CategorySpecificationGrid {
		_id: string;
		srNo: number;
		itemName: {
			name: string;
			imageURL: string;
		};
		itemCode: string;
		entryTime: string;
		rowStatus: RowStatus;
	}
}
