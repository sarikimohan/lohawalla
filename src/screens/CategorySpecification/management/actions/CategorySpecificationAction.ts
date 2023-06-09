import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";
import fetchCategoryItems from "../../fetch/services/fetchCategoryItems";
import fetchCategorySpec from "../../fetch/services/fetchCategorySpec";

export default class CategorySpecificationAction
	extends ServerStateUtils<CategorySpecification.State>
	implements CategorySpecification.Actions
{
	getItemListLen() {
		return this.state.itemList.length;
	}

	async fetchData(id: string) {
		const res = await this.handleAsync("fetchItemData", () =>
			fetchCategoryItems(id)
		);
		const resSpec = await this.handleAsync("fetchSpecData", () =>
			fetchCategorySpec(id)
		);

		if (res) {
			this.mutateState((p) => {
				p.itemList = res.data;
			});
		}

		if (resSpec) {
			this.mutateState((p) => {
				p.categorySpec = resSpec.data;
			});
		}
	}

	filterList(): CategorySpecification.ItemGridData[] {
		return this.state.itemList.filter((v) => {
			for (let filter of this.state.filter.filters) {
				if (filter.isActive) {
					const query = this.state.filter.query;
					if (filter.name === "item name") {
						if (isPrefix(v.itemName.name.toLowerCase(), query)) return true;
					}
					if (filter.name === "item code") {
						if (isPrefix(v.itemCode.toString(), query)) return true;
					}
				}
			}
			return false;
		});
	}
	setQuery(query: string): void {
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
