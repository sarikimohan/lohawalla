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

		if (verdict.isValid) {
			const res = await this.handleAsync(
				"checkName",
				() => checkIsNameUnique(data.value),
				{
					onError: (err) => {
						verdict.isValid = false;
						data.error = "server error, cannot check uniqueness of name";
					},
					onSuccess: ({ data: res }) => {
						if (res === false) {
							verdict.isValid = false;
							data.error = "name already exists";
						}
					},
				}
			);
		}

		data.isValid = !data.error;

		this.mutateState((p) => {
			p.firstForm.companyName = data;
		});

		return data.isValid === true && verdict.isValid === true;
	}
	validateDescription() {
		const verdict = { isValid: true };

		const data = this.state.firstForm.description;

		data.error = FieldDataService.registerValidator(
			data.value,
			verdict,
			Validators.validateNull
		);

		data.isValid = !data.error;

		this.mutateState((p) => void (p.firstForm.description = data));

		return data.isValid;
	}
	async valiadteFirstForm(onSuccess: () => void) {
		const v = [await this.validateCompanyName(), this.validateDescription()];

		const verdict = v.reduce((a, c) => a && c, true);

		if (verdict) {
			onSuccess();
		}
	}

	//* ///////////////////////// SECOND FORM /////////////////////////////
	validatePriceField() {
		const verdict = { isValid: true };
		// check if isfixed and no value
		// value -> percentage float(0, 100)
		// value --> num (1)
		this.mutateState((p) => {
			if (p.priceStructure.length === 0) {
				p.priceStructureError =
					"cannot save company with empty price structure";
				verdict.isValid = false;
				return;
			}
			p.priceStructure.map((v, i) => {
				const data = v.value;
				if (v.fixed) {
					if (v.type === "numeric") {
						data.error = FieldDataService.registerValidator(
							data.value,
							verdict,
							Validators.validateNull,
							Validators.validateFloat
						);
					} else {
						data.error = FieldDataService.registerValidator(
							data.value,
							verdict,
							Validators.validateNull,
							Validators.validateFloat,
							(d) => Validators.min(d, -100),
							(d) => Validators.max(d, 100)
						);
					}
				}
				data.isValid = !data.error;
				p.priceStructure[i].value = data;
			});
		});

		return verdict.isValid;
	}

	// validate unique name
	validateAddPriceField(onSuccess: () => void) {
		const verdict = { isValid: true };
		this.mutateState((p) => {
			p.tempPriceStructure.map((v, i) => {
				const data = v.name;
				data.error = FieldDataService.registerValidator(
					data.value,
					verdict,
					Validators.validateNull,
					(d) => {
						for (let pf of p.priceStructure) {
							if (pf.name === d) return d + " already exists";
						}
					}
				);
				data.isValid = !data.error;
				p.tempPriceStructure[i].name = data;
			});
		});
		return verdict;
	}

	//* ///////////////////////// THIRD FORM /////////////////////////////
	validateDescriptionLabels() {
		const verdict = { isValid: true };

		this.mutateState((p) => {
			p.descriptionLabels.map((v, i) => {
				const data = v.value;
				data.error = FieldDataService.registerValidator(
					data.value,
					verdict,
					Validators.validateNull
				);
				data.isValid = !data.error;

				p.descriptionLabels[i].value = data;
			});
		});

		return verdict.isValid;
	}

	validateAddDescriptionLabels() {
		const verdict = { isValid: true };

		const key = this.state.descriptionEntry.key;
		key.value = key.value.trim();
		const value = this.state.descriptionEntry.value;
		value.value = value.value.trim();

		key.error = FieldDataService.registerValidator(
			key.value,
			verdict,
			Validators.validateNull,
			(d) => {
				for (let dl of this.state.descriptionLabels) {
					if (d === dl.key) return d + " already exists";
				}
			}
		);
		key.isValid = !key.error;

		value.error = FieldDataService.registerValidator(
			value.value,
			verdict,
			Validators.validateNull
		);
		value.isValid = !value.error;

		this.mutateState((p) => {
			p.descriptionEntry = { key, value };
		});

		return verdict.isValid;
	}
}
