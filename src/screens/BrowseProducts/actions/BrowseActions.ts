import getAllCategoryNames from "@src/forms/AddProduct/fetch/services/getAllCategoryNames";
import getAllCompanyNames from "@src/forms/AddProduct/fetch/services/getAllCompanyNames";
import getAllItemNamesOfCategory from "@src/forms/AddProduct/fetch/services/getAllItemNamesOfCategory";
import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";

export default class BrowseActions extends ServerStateUtils<
	StateWithLoading<BrowseProducts.State>
> {
	async getAllCompanyList() {
		const res = await this.handleAsync("fetchCompanies", () =>
			getAllCompanyNames()
		);
		if (res) {
			this.mutateState((p) => {
				p.companiesList = res.data;
			});
		}
	}
	setSelectedCompany(data: BrowseProducts.Entity | null) {
		this.mutateState((p) => {
			p.selectedCompany.value = data;
		});
	}

	async getAllCategoryList() {
		const res = await this.handleAsync("fetchCategory", () =>
			getAllCategoryNames()
		);
		if (res) {
			this.mutateState((p) => {
				p.categoryList = res.data;
				p.itemList = [];
			});
		}
	}
	setSelectedCategory(data: BrowseProducts.Entity | null) {
		this.mutateState((p) => {
			p.selectedCategory.value = data;
			p.itemList = [];
			p.selectedItem.value = null;
		});
	}

	async getAllItemList() {
		const selectedCategory = this.state.selectedCategory.value;
		if (selectedCategory) {
			const res = await this.handleAsync("fetchItems", () =>
				getAllItemNamesOfCategory(selectedCategory._id)
			);
			if (res) {
				this.mutateState((p) => {
					p.itemList = res.data;
				});
			}
		}
	}
	setSelectedItem(data: BrowseProducts.Entity | null) {
		this.mutateState((p) => {
			p.selectedItem.value = data;
		});
	}
}
