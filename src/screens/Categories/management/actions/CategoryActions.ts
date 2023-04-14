import ComponentActions from "@src/modules/StateManagement/Core/ComponentAction";

export default class CategoryActions extends ComponentActions<Categories.State> {
	setQuery(query: string) {
		this.stateUtils.mutateState((p) => {
			p.filter.query = query;
		});
	}

	toggleFilter(id: string) {
		this.stateUtils.mutateState((p) => {
			for (let filter of p.filter.filters) {
				if (filter.id === id) {
					filter.isActive = !filter.isActive;
				}
			}
		});
	}

}
