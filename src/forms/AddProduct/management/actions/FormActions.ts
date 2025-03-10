import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import getAllCompanyNames from "../../fetch/services/getAllCompanyNames";
import getAllCategoryNames from "../../fetch/services/getAllCategoryNames";
import getAllItemNamesOfCategory from "../../fetch/services/getAllItemNamesOfCategory";
import getSecondFormData from "../../fetch/services/getSecondFormData";
import saveProduct from "../../fetch/services/saveProduct";
import SaveImage from "@src/modules/ImageServerUtils/services/SaveImage";

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

		if (categories) {
			this.mutateState((p) => {
				p.firstForm.categoryList = categories.data;
				p.firstForm.itemList = [];
				p.firstForm.selectedItem.value = null;
			});
		}
	}
	async fetchItems() {
		const selectedCategory = this.state.firstForm.selectedCategory.value;
		if (selectedCategory === null) return;
		const items = await this.handleAsync("fetchItems", () =>
			getAllItemNamesOfCategory(selectedCategory._id)
		);

		if (items) {
			this.mutateState((p) => {
				p.firstForm.itemList = items.data;
			});
		}
	}

	setSelectedCompany(entity: AddProduct.Entity | null) {
		this.mutateState((p) => {
			p.firstForm.selectedCompany.value = entity;
		});
	}
	setSelectedCategory(entity: AddProduct.Entity | null) {
		this.mutateState((p) => {
			p.firstForm.selectedCategory.value = entity;
			p.firstForm.itemList = [];
			p.firstForm.selectedItem.value = null;
		});
	}
	setSelectedItem(entity: AddProduct.Entity | null) {
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

export class SecondFormActions extends ServerStateUtils<AddProduct.State> {
	async saveData(by: NameIdPair, images: string[]) {
		const categoryId = this.state.firstForm.selectedCategory.value?._id;
		const itemId = this.state.firstForm.selectedItem.value?._id;
		const companyId = this.state.firstForm.selectedCompany.value?._id;

		const imgRes = await this.handleAsync('saveImages', () => SaveImage(this.state.firstForm.imageList));
		
		if (categoryId && itemId && companyId) {
			const d = {
				companyId,
				categoryId,
				itemId,
				priceStructure: this.state.secondForm.priceStructure.map((v, i) => ({
					_id: v._id,
					value: parseFloat(v.value.value),
				})),
				by,
				gst: {
					type: this.state.secondForm.gst.type,
					value: parseFloat(this.state.secondForm.gst.value.value),
				},
				description: this.state.thirdForm.description.value,
				descriptionLabels: this.state.thirdForm.descriptionLabels.map(
					(v, i) => ({
						key: v.key,
						value: v.value.value,
						position: i,
					})
				),
				images,
			};
			if(imgRes) {
				d.images = imgRes.data;
			}
			const res = await this.handleAsync("save", () => saveProduct(d));
		}
	}
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
				console.log(data.priceStructure);
				this.mutateState((p) => {
					p.secondForm.credits = data.credits;
					p.secondForm.negotiation = data.negotiation;
					p.secondForm.margin = data.margin;
					p.secondForm.priceStructure = data.priceStructure
						.sort((a, b) => a.position - b.position)
						.map((v, i) => ({
							_id: v._id,
							name: v.name,
							value: { value: v.value === -1 ? "" : v.value.toString() },
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
	setGstValue(data: string) {
		this.mutateState((p) => {
			p.secondForm.gst.value.value = data;
		});
	}
	setGstType(type: PercNum) {
		this.mutateState((p) => {
			p.secondForm.gst.type = type;
		});
	}
}
