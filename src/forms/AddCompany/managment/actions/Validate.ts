import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import AddCompany from "../../AddCompany";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import checkIsNameUnique from "../../fetch/services/checkIsNameUnique";

export default class ValidateAddCompany extends ServerStateUtils<AddCompany.State> {
	//* ///////////////////////// FIRST FORM /////////////////////////////
	async validateCompanyName() {
		const verdict = { isValid: true };

		const data = this.state.firstForm.companyName;

		data.error = FieldDataService.registerValidator(
			data.value,
			verdict,
			Validators.validateNull
		);

		if (data.isValid) {
			this.handleAsync("checkName", () => checkIsNameUnique(data.value), {
				onError: (err) => {
					data.error = "server error, cannot check uniqueness of name";
				},
				onSuccess: ({ data: res }) => {
					if (res === false) {
						data.error = "name already exists";
					}
				},
			});
		}

		data.isValid = !data.error;

		this.mutateState((p) => {
			p.firstForm.companyName = data;
		});

		return data.isValid === true && verdict.isValid === true;
	}
	validateDescription() {}
	valiadteFirstForm() {}

	//* ///////////////////////// SECOND FORM /////////////////////////////
	validatePriceField() {}
	validateAddPriceField() {}

	//* ///////////////////////// THIRD FORM /////////////////////////////
	validateDescriptionLabels() {}
}
