import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import checkIsNameUnique from "../../fetch/service/checkIsNameUnique";
import checkIsCodeUnique from "../../fetch/service/checkIsCodeUnique";

export default class Validate extends ServerStateUtils<AddItem.State> {
	//* ///////////////////////////// FIRST FORM /////////////////////////////
	validateName() {
		// ex, unq
		const verdict = { isValid: true };

		const name = this.state.itemName;
		name.error = FieldDataService.registerValidator(
			name.value,
			verdict,
			Validators.validateNull
		);
		if (name.error === undefined) {
			this.handleAsync("checkName", () => checkIsNameUnique(name.value), {
				onError: (err) => {
					name.error = "server error, cannot check uniqueness of name";
				},
				onSuccess: (d) => {
					const res = d.data;
					if (res === false) {
						name.error = name.value + " already exists";
					}
				},
			});
		}

		name.isValid = !name.error;

		this.mutateState((p) => (p.itemName = name));

		return verdict.isValid && name.isValid === true;
	}
	validateHSNCode() {
		// ex, int
		const verdict = { isValid: true };

		const code = this.state.itemHSNCode;

		code.error = FieldDataService.registerValidator(
			code.value,
			verdict,
			Validators.validateNull,
			Validators.validateInt,
			(d) => Validators.min(d, 0)
		);
		code.isValid = !code.error;

		this.mutateState((p) => (p.itemHSNCode = code));

		return verdict.isValid;
	}
	validateCode() {
		// ex, unq
		const verdict = { isValid: true };
		const code = this.state.itemCode;

		code.error = FieldDataService.registerValidator(
			code.value,
			verdict,
			Validators.validateNull
		);
		if (!code.error) {
			this.handleAsync("checkCode", () => checkIsCodeUnique(code.value), {
				onError: (err) => {
					code.error = "server error, cannot check uniqueness of code";
				},
				onSuccess: (d) => {
					if (d.data === false) {
						code.error = code.value + " already exists";
					}
				},
			});
		}
		code.isValid = !code.error;

		this.mutateState((p) => {
			p.itemCode = code;
		});

		return verdict.isValid && code.isValid === true;
	}
	validateDescription() {
		// ex
		const verdict = { isValid: true };
		const desc = this.state.description;

		desc.error = FieldDataService.registerValidator(
			desc.value,
			verdict,
			Validators.validateNull
		);
		desc.isValid = !desc.error;

		this.mutateState((p) => {
			p.description = desc;
		});

		return verdict.isValid;
	}

	//* ///////////////////////////// SECOND FORM /////////////////////////////
	validateMargin() {
		// ex, float, <100
		const verdict = { isValid: true };

		const margin = this.state.margin;

		margin.cash.error = FieldDataService.registerValidator(
			margin.cash.value,
			verdict,
			Validators.validateNull,
			Validators.validateFloat,
			(d) => Validators.max(d, 100),
			(d) => Validators.min(d, 0)
		);

		margin.online.error = FieldDataService.registerValidator(
			margin.online.value,
			verdict,
			Validators.validateNull,
			Validators.validateFloat,
			(d) => Validators.max(d, 100),
			(d) => Validators.min(d, 0)
		);

		this.mutateState((p) => {
			p.margin = margin;
		});

		return verdict.isValid;
	}

	//* ///////////////////////////// THIRD FORM /////////////////////////////
	validateDescriptionLabels() {
		// value(ex)
		const verdict = { isValid: true };

		this.mutateState((p) => {
			p.descriptionLabels.map((v, i) => {
				const data = v.value;
				data.error = FieldDataService.registerValidator(
					data.value,
					verdict,
					Validators.validateNull
				);
        
			});
		});
	}

	validateAddDescription() {
		// value(ex) key(unique, ex);
	}
}
