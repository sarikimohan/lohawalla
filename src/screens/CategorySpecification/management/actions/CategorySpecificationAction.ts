import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";
import fetchCategoryItems from "../../fetch/services/fetchCategoryItems";
import fetchCategorySpec from "../../fetch/services/fetchCategorySpec";
import deleteCategory from "../../fetch/services/deleteCategory";

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
		const query = this.state.filter.query.trim().toLowerCase();

		if (query.length === 0) return this.state.itemList;

		return this.state.itemList.filter((v) => {
			let verdict = false;
			for (let filter of this.state.filter.filters) {
				if (filter.isActive) {
					if (filter.name === "item name") {
						verdict ||= isPrefix(v.itemName.name.trim().toLowerCase(), query);
					}
					if (filter.name === "item code") {
						verdict ||= isPrefix(v.itemCode.trim().toLowerCase(), query);
					}
				}
			}
			return verdict;
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

	async deleteCategory(id: string, onSuccess: () => void) {
		await this.handleAsync("deleteCategory", () => deleteCategory(id));
		onSuccess();
	}
}
