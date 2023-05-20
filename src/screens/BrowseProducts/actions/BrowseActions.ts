import getAllCategoryNames from "@src/forms/AddProduct/fetch/services/getAllCategoryNames";
import getAllCompanyNames from "@src/forms/AddProduct/fetch/services/getAllCompanyNames";
import getAllItemNamesOfCategory from "@src/forms/AddProduct/fetch/services/getAllItemNamesOfCategory";
import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import fetchProductList from "../fetch/services/fetchProductList";

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

	//* ////////////// FETCHING PRODUCTS //////////////////
	async fetchProducts(companyId?: string) {
		if (!companyId && !this.state.selectedCompany.value) return;
		const cId = this.state.selectedCompany.value
			? this.state.selectedCompany.value._id
			: companyId;
		const categoryId = this.state.selectedCategory.value
			? this.state.selectedCategory.value._id
			: undefined;
		const itemId = this.state.selectedItem.value
			? this.state.selectedItem.value._id
			: undefined;

		const res = await this.handleAsync("fetchProducts", () =>
			fetchProductList(cId as string, categoryId, itemId)
		);

		console.log(res);

		if (res) {
			this.mutateState((p) => {
				p.gridHeader = res.data.gridHeader;
				p.gridData = res.data.gridData;
			});
		}
	}
}
