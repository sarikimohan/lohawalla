import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import checkIsEntryUnique from "../../fetch/services/checkIsEntryUnique";

export default class AddProductValidators extends ServerStateUtils<AddProduct.State> {
	//* //////////////////////// FIRST FORM ////////////////////////
	validateCompany() {
		const data = this.state.firstForm.selectedCompany;
		data.error = data.value === null ? "req" : undefined;
		console.log(data);
		this.mutateState((p) => {
			p.firstForm.selectedCompany = data;
		});
		return !data.error;
	}
	validateCategory() {
		const data = this.state.firstForm.selectedCategory;
		data.error = data.value === null ? "req" : undefined;
		this.mutateState((p) => {
			p.firstForm.selectedCategory = data;
		});
		return !data.error;
	}
	validateItem() {
		const data = this.state.firstForm.selectedItem;
		data.error = data.value === null ? "req" : undefined;
		this.mutateState((p) => {
			p.firstForm.selectedItem = data;
		});
		return !data.error;
	}

	async validateUnique() {
		const companyId = this.state.firstForm.selectedCompany.value;
		const itemId = this.state.firstForm.selectedItem.value;

		if (!companyId || !itemId) return false;

		const res = await this.handleAsync("checkUnique", () =>
			checkIsEntryUnique({
				companyId: companyId._id,
				itemId: itemId._id,
			})
		);

		if (res) {
			if (res.data === false) {
				this.mutateState((p) => {
					p.firstForm.uniqueError =
						"product already exists for the selected company and the item";
				});
			}
			return res.data;
		} else {
			this.mutateState((p) => {
				p.firstForm.uniqueError =
					"server error, couldn't check for the uniqueness of the product entry";
			});
			return false;
		}
	}

	async validateFirstForm() {
		const v = [
			this.validateCategory(),
			this.validateCompany(),
			this.validateItem(),
			await this.validateUnique(),
		];
		console.log(v);
		return v.reduce((a, c) => a && c, true);
	}

	//* //////////////////////// SECOND FORM ////////////////////////
	validatePriceStructure() {
		const verdict = { isValid: true };

		this.mutateState((p) => {
			p.secondForm.priceStructure.map((v, i) => {
				if (v.isFixed === false) {
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
				}
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
				(d) => Validators.max(d, 100),
				(d) => Validators.min(d, 0)
			);
		}

		gst.value.isValid = !gst.value.error;

		this.mutateState((p) => {
			p.secondForm.gst = gst;
		});

		return verdict.isValid;
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

		return verdict.isValid;
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
				data.key.value.trim(),
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
