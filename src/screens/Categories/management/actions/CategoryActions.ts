import ComponentActions from "@src/modules/StateManagement/Core/ComponentAction";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class CategoryActions extends StateUtils<Categories.State> {
	/**
	 * THE GETTERS
	 */
	getOptions() {
		return this.state.filter.filters;
	}

	setQuery(query: string) {
		this.mutateState((p) => {
			p.filter.query = query;
		});
	}

	toggleFilter(id: string) {
		// this.mutateState((p) => {
		// 	for (let filter of p.filter.filters) {
		// 		if (filter.id === id) {
		// 			filter.isActive = !filter.isActive;
		// 		}
		// 	}
		// });
		console.log(this.mutateState);
	}
}
