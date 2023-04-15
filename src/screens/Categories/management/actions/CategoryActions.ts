import ComponentActions from "@src/modules/StateManagement/Core/ComponentAction";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class CategoryActions extends StateUtils<Categories.State> implements Categories.Actions {
	/**
	 * THE GETTERS
	*/
	getOptions() {
		return this.state.filter.filters;
	}
	getCategoryGridData() {
		throw new Error("Method not implemented.");
	}
	
	/**
	 * The setters 
	 */
	filterCategoryData(): Categories.CategoryGridData[] {
		throw new Error("Method not implemented.");
	}
	
	fetchCategoryGridData() {
		throw new Error("Method not implemented.");
	}
	setQuery(query: string) {
		this.mutateState((p) => {
			p.filter.query = query;
		});
	}
	toggleFilter(id: string) {
		this.mutateState((p) => {
			for (let filter of p.filter.filters) {
				if (filter.id === id) {
					filter.isActive = !filter.isActive;
				}
			}
		});
	}

	
}
