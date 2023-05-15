import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import getAllCompanyNames from "../../fetch/services/getAllCompanyNames";
import getAllCategoryNames from "../../fetch/services/getAllCategoryNames";
import getAllItemNamesOfCategory from "../../fetch/services/getAllItemNamesOfCategory";
import getSecondFormData from "../../fetch/services/getSecondFormData";

export default class FirstFormActions extends ServerStateUtils<AddProduct.State> {
	async fetchCompanies() {
		const companies = await this.handleAsync("fetchCompanies", () =>
			getAllCompanyNames()
		);

		if (companies) {
			this.mutateState((p) => {
				p.firstForm.companiesList = companies.data;
			});
		}
	}
	async fetchCategoies() {
		const categories = await this.handleAsync("fetchCategories", () =>
			getAllCategoryNames()
		);
	}
	async fetchItems(id: string) {
		const items = await this.handleAsync("fetchItems", () =>
			getAllItemNamesOfCategory(id)
		)

		if (items) {
			this.mutateState(p =>
				p.firstForm.itemList = items.data
			)
		}
	}

	setSelectedCompany(entity: AddProduct.Entity) {
		this.mutateState((p) => {
			p.firstForm.selectedCompany.value = entity;
		});
	}
	setSelectedCategory(entity: AddProduct.Entity) {
		this.mutateState((p) => {
			p.firstForm.selectedCategory.value = entity;
		});
	}
	setSelectedItem(entity: AddProduct.Entity) {
		this.mutateState((p) => {
			p.firstForm.selectedItem.value = entity;
		});
	}
	setImages() {
		const images = this.state.firstForm.imageList;
		this.mutateState((p) => {
			p.firstForm.imageList = images;
		});
	}
}

class SecondFormActions extends ServerStateUtils<AddProduct.State> {
	async fetchSecondFormData() {
		const categoryId = this.state.firstForm.selectedCategory.value?._id;
		const itemId = this.state.firstForm.selectedItem.value?._id;
		const companyId = this.state.firstForm.selectedCompany.value?._id;

		if (categoryId && itemId && companyId) {
			const res = await this.handleAsync("fetchSecondForm", () =>
				getSecondFormData({
					categoryId,
					itemId,
					companyId,
				})
			);

			if (res) {
				const data = res.data;
				this.mutateState((p) => {
					p.secondForm.credits = data.credits;
					p.secondForm.negotiation = data.negotiation;
					p.secondForm.margin = data.margin;
					p.secondForm.priceStructure = data.priceStructure.map((v, i) => ({
						_id: v._id,
						name: v.name,
						value: { value: v.value.toString() },
						isFixed: v.isFixed,
						position: v.position,
						type: v.type,
						operation: v.operation,
					}));
				});
			}
		}
	}

	setPriceFieldValue(i: number, v: string) {
		this.mutateState((p) => {
			p.secondForm.priceStructure[i].value.value = v;
		});
	}
	setGstValue() {
		const gstValue = this.state.secondForm.gst;
		this.mutateState((p) => {
			p.secondForm.gst = gstValue;
		});
	}
}

class ThirdFormActions extends StateUtils<AddProduct.State> {
	setDescription() {
		const description = this.state.thirdForm.description;
		this.mutateState((p) => {
			p.thirdForm.description = description;
		});
	}
}

class SubmitFormActions extends StateUtils<AddProduct.State> {
	
}
