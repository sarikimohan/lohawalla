import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";

export default class AddProductValidators extends ServerStateUtils<AddProduct.State> {
	validateCompany() {
		const data = this.state.firstForm.selectedCompany;
		if (data.value === null) {
			data.error = "required";
			return false;
		}
		return true;
	}
	validateCategory() {
		const data = this.state.firstForm.selectedCategory;
		if (data.value === null) {
			data.error = "required";
			return false;
		}
		return true;
	}
	validateItem() {
		const data = this.state.firstForm.selectedItem;
		if (data.value === null) {
			data.error = "required";
			return false;
		}
		return true;
	}
	validateFirstForm() {
		return (
			this.validateCategory() && this.validateCompany() && this.validateItem()
		);
	}

	validatePriceStructure() {
		const verdict = { isValid: true };

		this.mutateState((p) => {
			p.secondForm.priceStructure.map((v, i) => {
				const data = v.value;
				if (v.type === "percentage") {
					data.error = FieldDataService.registerValidator(
						data.value,
						verdict,
						Validators.validateNull,
						Validators.validateFloat,
						(d) => Validators.min(d, 0),
						(d) => Validators.max(d, 100)
					);
				} else {
					data.error = FieldDataService.registerValidator(
						data.value,
						verdict,
						Validators.validateNull,
						Validators.validateFloat,
						(d) => Validators.min(d, 1)
					);
				}
				p.secondForm.priceStructure[i].value = data;
			});
		});

		return verdict.isValid;
	}
	validateGSTValue() {
		const gst = this.state.secondForm.gst;
		const verdict = { isValid: true };

		if (gst.type === "numeric") {
			gst.value.error = FieldDataService.registerValidator(
				gst.value.value,
				verdict
			);
		}
	}
	validateSecondForm() {}

	validateDescriptionLabels() {}
}
