import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import { AxiosError } from "axios";
import checkIsNameUnique from "../../fetch/services/checkIsNameUnique";
import checkIsCodeUnique from "../../fetch/services/checkIsCodeUnique";
import { verify } from "crypto";

export default class ValidateAddCategory extends ServerStateUtils<AddCategory.State> {
	//* first form
	async validateCategoryName() {
		const verdict = { isValid: true };
		const data = this.state.firstForm.categoryName;
		data.error = FieldDataService.registerValidator(
			data.value,
			verdict,
			Validators.validateNull
		);

		if (!data.error) {
			await this.handleAsync("checkName", () => checkIsNameUnique(data.value), {
				onError: (err) => {
					data.error = "server error, cannot check uniqueness of name";
				},
				onSuccess: ({ data: res }) => {
					console.log(res);
					if (res === false) {
						data.error = "this name already exists, try another ";
					}
				},
			});
		}

		data.isValid = !data.error;

		this.mutateState((p) => {
			p.firstForm.categoryName = data;
		});

		return verdict.isValid && data.isValid === true;
	}

	async validateCategoryCode() {
		const verdict = { isValid: true };
		const data = this.state.firstForm.categoryCode;
		data.error = FieldDataService.registerValidator(
			data.value,
			verdict,
			Validators.validateNull
		);

		if (!data.error) {
			await this.handleAsync("checkCode", () => checkIsCodeUnique(data.value), {
				onError: (err) => {
					data.error = "server error, cannot check uniqueness of code";
				},
				onSuccess: ({ data: res }) => {
					if (res === false) {
						data.error = "category code already exists";
					}
				},
			});
		}

		data.isValid = !data.error;

		this.mutateState((p) => {
			p.firstForm.categoryCode = data;
		});

		return verdict.isValid && data.isValid === true;
	}

	validateDescirption() {
		const verdict = { isValid: true };
		const data = this.state.firstForm.description;
		data.error = FieldDataService.registerValidator(
			data.value,
			verdict,
			Validators.validateNull
		);

		data.isValid = !data.error;

		this.mutateState((p) => (p.firstForm.description = data));

		return verdict.isValid;
	}

	//* first form validtion;
	async validateFirstForm(onSuccess: () => void) {
		const v = [
			await this.validateCategoryName(),
			await this.validateCategoryCode(),
			this.validateDescirption(),
		];
		const verdict = v.reduce((a, c) => {
			return a && c;
		}, true);

		if (verdict) {
			onSuccess();
		}
	}

	//* ///////////////////////// SECOND FORM /////////////////////////////
	validateCredit() {
		const verdict = { isValid: true };

		this.mutateState((p) => {
			p.credit.forEach((v, i) => {
				const data = v.value;

				data.error = FieldDataService.registerValidator(
					data.value,
					verdict,
					Validators.validateNull,
					Validators.validateFloat,
					(d) => Validators.min(d, 0),
					(d) => Validators.max(d, 100)
				);

				data.isValid = !data.error;

				if (data.isValid === false) {
					verdict.isValid = false;
				}

				p.credit[i].value = data;
			});
		});

		return verdict.isValid;
	}

	validateAddCredit() {
		const verdict = { isValid: true };

		const key = this.state.creditInput.key;
		key.value = key.value.trim();
		const value = this.state.creditInput.value;
		value.value = value.value.trim();

		// check null and unique
		key.error = FieldDataService.registerValidator(
			key.value,
			verdict,
			Validators.validateNull,
			Validators.validateInt,
			(d) => {
				const days = parseInt(d);
				let isPresent = false;
				this.state.credit.forEach((v) => {
					if (v.days === days) {
						isPresent = true;
						return;
					}
				});
				if (isPresent) {
					return days + " is already present";
				}
			},
			(d) => Validators.min(d, 1)
		);
		key.isValid = !key.error;

		value.error = FieldDataService.registerValidator(
			value.value,
			verdict,
			Validators.validateNull,
			Validators.validateFloat,
			(d) => Validators.min(d, 0),
			(d) => Validators.max(d, 100) // by default percentage
		);
		value.isValid = !value.error;

		this.mutateState((p) => {
			p.creditInput.key = key;
			p.creditInput.value = value;
		});

		return verdict.isValid;
	}

	validateNegotiation() {
		const verdict = { isValid: true };
		const data = this.state.negotiation;

		data.error = FieldDataService.registerValidator(
			data.value,
			verdict,
			Validators.validateNull,
			Validators.validateFloat,
			(d) => Validators.min(d, 0),
			(d) => Validators.max(d, 100)
		);

		return verdict.isValid;
	}

	validateSecondForm(onSuccess: () => void) {
		const v = [this.validateCredit(), this.validateNegotiation()];

		const verdict = v.reduce((a, c) => a && c, true);
		if (verdict) {
			onSuccess();
		}
	}

	//* ///////////////////////// THIRD FORM /////////////////////////////
	validateDescriptionLabels(onSuccess: () => void) {
		const verdict = { isValid: true };
		this.mutateState((p) => {
			p.descriptionLabels.forEach((v, i) => {
				const data = v.value;
				data.error = FieldDataService.registerValidator(
					data.value,
					verdict,
					Validators.validateNull
				);

				data.isValid = !data.error;
				if (data.isValid === false) {
					verdict.isValid = false;
				}
				p.descriptionLabels[i].value = data;
			});
		});
		if (verdict.isValid) {
			onSuccess();
		}
	}

	validateAddDescription() {
		// validate empty and unique
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
				for (let { key } of this.state.descriptionLabels) {
					if (key === d) return key + " already exists";
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
