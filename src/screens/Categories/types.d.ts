namespace Categories {
	export interface CategoryGridData {
		_id: string;
		srNo: number;
		categoryName: {
			name: string;
			imageURL: string | null;
		};
		categoryCode: string;
		entryTime: string;
		noOfItems: number;
		rowStatus: {
			isFixed: boolean;
			position: number;
		};
	}

	interface State {
		showForm: boolean;
		categoryList: CategoryGridData[];
		filter: Filter;
		loading: {
			get: AsyncState;
		};
		refresh: boolean;
	}

	export interface Actions {
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
