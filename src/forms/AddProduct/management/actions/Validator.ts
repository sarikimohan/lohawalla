import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";

export default class AddProductValidators extends ServerStateUtils<AddProduct.State> {
	validateCompany() {
		//* //////////////////////// FIRST FORM ////////////////////////
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

	//* //////////////////////// SECOND FORM ////////////////////////
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
				data.isValid = !data.error;

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
				verdict,
				Validators.validateNull,
				Validators.validateFloat,
				(d) => Validators.min(d, 0)
			);
		} else {
			gst.value.error = FieldDataService.registerValidator(
				gst.value.value,
				verdict,
				Validators.validateNull,
				Validators.validateFloat,
				(d) => Validators.max(d, 0),
				(d) => Validators.max(d, 100)
			);
		}

		gst.value.isValid = !gst.value.error;

		this.mutateState((p) => {
			p.secondForm.gst = gst;
		});

		return verdict;
	}
	validateSecondForm() {
		return this.validatePriceStructure() && this.validateGSTValue();
	}

	//* //////////////////////// THIRD FORM ////////////////////////
	validateDescription() {
		// ex
		const verdict = { isValid: true };

		this.mutateState((p) => {
			const data = p.thirdForm.description;
			data.error = FieldDataService.registerValidator(
				data.value,
				verdict,
				Validators.validateNull
			);
			data.isValid = !data.error;

			p.thirdForm.description = data;
		});

		return verdict;
	}
	validateDescriptionLabels() {
		// ex
		const verdict = { isValid: true };
		this.mutateState((p) => {
			p.thirdForm.descriptionLabels.forEach((v, i) => {
				const data = v.value;
				data.error = FieldDataService.registerValidator(
					data.value,
					verdict,
					Validators.validateNull
				);
				data.isValid = !data.error;

				p.thirdForm.descriptionLabels[i].value = data;
			});
		});
		return verdict.isValid;
	}
	validateAddDescription() {
		// ex, uniq
		const verdict = { isValid: true };
		this.mutateState((p) => {
			const data = p.thirdForm.descriptionEntry;

			data.key.error = FieldDataService.registerValidator(
				data.key.value,
				verdict,
				Validators.validateNull,
				(d) => {
					for (let i of p.thirdForm.descriptionLabels) {
						if (i.key === d) {
							return d + " is already present";
						}
					}
				}
			);
			data.key.isValid = !data.key.error;

			data.value.error = FieldDataService.registerValidator(
				data.value.value,
				verdict,
				Validators.validateNull
			);
			data.value.isValid = !data.value.error;
		});

		return verdict.isValid;
	}
}
