namespace Categories {
	export interface CategoryGridData {
		_id: string;
		srNo: number;
		categoryName: {
			name: string;
			imageURL: string | null;
		};
		categoryCode: number;
		entryTime: string;
		noOfItems: number;
		rowStatus: {
			isFixed: boolean;
			fixedPosition: number;
		};
	}

	interface State {
		categoryList: CategoryListData[];
		filter: Filter;
		loading: {
			fetchCategoryList: AsyncState;
		};
	}

	interface Actions {
		/**
		 * set the query from the input
		 */
		setQuery(query: string): void;

		/**
		 * filter the category data depending on the value of filter;
		 */
		filterCategoryData(): CategoryGridData[];

		/**
		 * toggles the isActive value for the filter option with the specific id
		 */
		toggleFilter(id: string);

		/**
		 * get the category grid data
		 */
		getCategoryGridData();

		/**
		 * fetch the category grid data
		 */
		fetchCategoryGridData();
	}
}
