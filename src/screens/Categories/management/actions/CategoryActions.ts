import { getCategoryGridData } from "@src/globals/constants/async";
import ComponentActions from "@src/modules/StateManagement/Core/ComponentAction";
import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";
// import server from "@src/modules/axios/instances";
import fetchCategoryGrid from "../../fetch/services/fetchCategoryGrid";

export default class CategoryActions
	extends ServerStateUtils<Categories.State>
	implements Categories.Actions
{
	/**
	 * THE GETTERS
	 */
	getOptions() {
		return this.state.filter.filters;
	}
	getCategoryGridData() {
		return this.state.categoryList;
	}

	/**
	 * The setters
	 */
	filterCategoryData(): Categories.CategoryGridData[] {
		const query = this.state.filter.query.toLowerCase().trim();
		if (query === "") return this.state.categoryList;
		return this.state.categoryList.filter((v) => {
			let verdict = false;

			for (let filter of this.state.filter.filters) {
				if (filter.isActive) {
					if (filter.id === "cname") {
						verdict =
							verdict || isPrefix(v.categoryName.name.toLowerCase(), query);
					}
					if (filter.id === "ccode") {
						verdict =
							verdict ||
							isPrefix(v.categoryCode.toString().toLowerCase(), query);
					}
				}
			}
			
			return verdict;
		});
	}

	async fetchCategoryGridData() {
		const res = await this.handleAsync("get", () => fetchCategoryGrid());
		if (res) {
			this.mutateState((p) => {
				p.categoryList = res.data;
			});
		}
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
