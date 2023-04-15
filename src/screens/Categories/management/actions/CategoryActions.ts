import { getCategoryGridData } from "@src/globals/constants/async";
import ComponentActions from "@src/modules/StateManagement/Core/ComponentAction";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";

export default class CategoryActions
	extends StateUtils<Categories.State>
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
		return this.state.categoryList.filter((v) => {
			for (let filter of this.state.filter.filters) {
				if (filter.isActive) {
					const query = this.state.filter.query.toLowerCase().trim();
					if (filter.name === "category name") {
						if(isPrefix(v.categoryName.name.toLowerCase(), query)) return true;
					}
					if (filter.name === "category code") {
						if(isPrefix(v.categoryCode.toString().toLowerCase(), query)) return true;
					}
				}
				return false;
			}
		});
	}

	fetchCategoryGridData() {
		this.mutateState(
			(p) => (p.loading.fetchCategoryList.status = "initialized")
		);
		getCategoryGridData()
			.then((res) => {
				// map
				// we have to transform the server response to the ui state
				this.mutateState((p) => {
					const arr: Categories.CategoryGridData[] = [];
					for (let data of res) {
						const newVal: Categories.CategoryGridData = {
							_id: data._id,
							srNo: data.srNo,
							categoryName: {
								name: data.categoryName.name,
								imageURL: data.categoryName.imageURL,
							},
							categoryCode: parseInt(data.categoryCode),
							entryTime: data.entryTime,
							noOfItems: data.noOfItems,
							rowStatus: {
								isFixed: false,
								fixedPosition: 0,
							},
						};
						arr.push(newVal);
					}
					p.categoryList = arr;
					p.loading.fetchCategoryList.status = "success";
				});
			})
			.catch((err) => {
				this.mutateState((p) => {
					p.loading.fetchCategoryList = {
						status: "failed",
						message: "some error occured",
					};
				});
			});
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
