import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";

export default class AddProductValidators extends ServerStateUtils<AddProduct.State> {
	validateCompany() {}
	validateCategory() {}
	validateItem() {}
	validateFirstForm() {}

	validatePriceStructure() {}
	validateGSTValue() {}
	validateSecondForm() {}

	validateDescriptionLabels() {}
}
