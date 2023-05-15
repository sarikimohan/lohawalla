import StateUtils, { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import getAllCompanyNames from "../../fetch/services/getAllCompanyNames";
import getAllCategoryNames from "../../fetch/services/getAllCategoryNames";
import getAllItemNamesOfCategory from "../../fetch/services/getAllItemNamesOfCategory";

export default class FirstFormActions extends ServerStateUtils<AddProduct.State> {
	async fetchCompanies() {
		const companies = await this.handleAsync("fetchCompanies",()=>
			getAllCompanyNames()
		)

		if(companies){
			this.mutateState(p=>{
				p.firstForm.companiesList = companies.data
			})
		}
	}
	async fetchCategoies() {
		const categories = await this.handleAsync("fetchCategories",()=>
			getAllCategoryNames()
		)

	}
	async fetchItems(id: string) {
		const items = await this.handleAsync("fetchItems",()=>
			getAllItemNamesOfCategory(id)
		)
	}

	setSelectedCompany() {
		const selectedCompany = this.state.firstForm.selectedCompany
		this.mutateState(p=>{
			p.firstForm.selectedCompany = selectedCompany
		})
	}
	setSelectedCategory() {
		const selectedCategory = this.state.firstForm.selectedCategory
		this.mutateState(p=>{
			p.firstForm.selectedCategory =selectedCategory
		})
	}
	setSelectedItem() {
		const selectedItem = this.state.firstForm.selectedItem
		this.mutateState(p=>{
			p.firstForm.selectedItem = selectedItem
		})
	}
	setImages() {
		const images = this.state.firstForm.imageList
		this.mutateState(p=>{
			p.firstForm.imageList = images
		})
	}
}

class SecondFormActions extends StateUtils<AddProduct.State> {
	fetchSecondFormData() {}

	setPriceFieldValue() {
		const priceFieldValue = this.state.secondForm.priceStructure
		this.mutateState(p=>{
			p.secondForm.priceStructure = priceFieldValue
		})
	}
	setGstValue() {
		const gstValue = this.state.secondForm.gst
		this.mutateState(p=>{
			p.secondForm.gst = gstValue
		})
	}
}

class ThirdFormActions extends StateUtils<AddProduct.State> {
	setDescription() {
		const description = this.state.thirdForm.description
		this.mutateState(p=>{
			p.thirdForm.description = description
		})
	}

}

class SubmitFormActions extends StateUtils<AddProduct.State> {}
