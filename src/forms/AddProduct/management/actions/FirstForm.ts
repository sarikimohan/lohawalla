import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class FirstFormActions extends StateUtils<AddProduct.State> {
	fetchCompanies() {
		this.state.firstForm
		this.state['firstForm']
	}
	fetchCategoies() {}
	fetchItems() {}

	setSelectedCompany() {}
	setSelectedCategory() {}
	setSelectedItem() {}
	setImages() {}

	validateFirstForm() {}
}

class SecondFormActions extends StateUtils<AddProduct.State> {
	fetchSecondFormData() {}

	setPriceFieldValue() {}
	setGstValue() {}

	validateSecondForm() {}
}

class ThirdFormActions extends StateUtils<AddProduct.State> {
	setDescription() {}

	validateThirdForm() {}
}

class SubmitFormActions extends StateUtils<AddProduct.State> {}
