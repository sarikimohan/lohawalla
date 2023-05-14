import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import { AxiosError } from "axios";
import checkIsNameUnique from "../../fetch/services/checkIsNameUnique";
import checkIsCodeUnique from "../../fetch/services/checkIsCodeUnique";

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
			this.handleAsync("checkName", () => checkIsNameUnique(data.value), {
				onError: (err) => {
					data.error = "server error, cannot check uniqueness of name";
				},
				onSuccess: ({ data: res }) => {
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
			this.handleAsync("checkCode", () => checkIsCodeUnique(data.value), {
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

	validateUnit() {
		const verdict = { isValid: true };
		const data = this.state.firstForm.unit;

		data.error = FieldDataService.registerValidator(
			data.value,
			verdict,
			Validators.validateNull
		);

		data.isValid = !data.error;

		this.mutateState((p) => (p.firstForm.unit = data));

		return verdict.isValid;
	}

	//* first form validtion;
	async validateFirstForm(onSuccess: () => void) {
		const v = [
			await this.validateCategoryName(),
			await this.validateCategoryCode(),
			this.validateDescirption(),
			this.validateUnit(),
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
	validateDescription(onSuccess: () => void) {
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
}
