import StateUtils, { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";

export default class FirstFormActions extends ServerStateUtils<AddProduct.State> {
	fetchCompanies() {
		
	}
	fetchCategoies() {}
	fetchItems() {}

	setSelectedCompany() {}
	setSelectedCategory() {}
	setSelectedItem() {}
	setImages() {}
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
