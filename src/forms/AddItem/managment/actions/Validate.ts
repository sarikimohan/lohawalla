import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import checkIsNameUnique from "../../fetch/service/checkIsNameUnique";
import checkIsCodeUnique from "../../fetch/service/checkIsCodeUnique";

export default class Validate extends ServerStateUtils<AddItem.State> {
	//* ///////////////////////////// FIRST FORM /////////////////////////////
	async validateName() {
		// ex, unq
		const verdict = { isValid: true };

		const name = this.state.itemName;
		name.error = FieldDataService.registerValidator(
			name.value,
			verdict,
			Validators.validateNull
		);
		if (name.error === undefined) {
			await this.handleAsync(
				"checkName",
				() => checkIsNameUnique(name.value.trim()),
				{
					onError: (err) => {
						name.error = "server error, cannot check uniqueness of name";
					},
					onSuccess: (d) => {
						const res = d.data;
						if (res === false) {
							name.error = name.value + " already exists";
						}
					},
				}
			);
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
	async validateCode() {
		// ex, unq
		const verdict = { isValid: true };
		const code = this.state.itemCode;

		code.error = FieldDataService.registerValidator(
			code.value,
			verdict,
			Validators.validateNull
		);
		if (!code.error) {
			await this.handleAsync(
				"checkCode",
				() => checkIsCodeUnique(code.value.trim()),
				{
					onError: (err) => {
						code.error = "server error, cannot check uniqueness of code";
					},
					onSuccess: (d) => {
						if (d.data === false) {
							code.error = code.value + " already exists";
						}
					},
				}
			);
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

	async validateFirstForm(onSuccess: () => void) {
		const v = [
			await this.validateName(),
			this.validateHSNCode(),
			await this.validateCode(),
			this.validateDescription(),
		];
		const verdict = v.reduce((a, c) => a && c, true);
		if (verdict) {
			onSuccess();
		}
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
		margin.cash.isValid = !margin.cash.error;

		margin.online.error = FieldDataService.registerValidator(
			margin.online.value,
			verdict,
			Validators.validateNull,
			Validators.validateFloat,
			(d) => Validators.max(d, 100),
			(d) => Validators.min(d, 0)
		);
		margin.online.isValid = !margin.online.error;

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
				data.isValid = !data.error;

				p.descriptionLabels[i].value = data;
			});
		});

		return verdict.isValid;
	}

	validateAddDescription() {
		// value(ex) key(unique, ex);
		const verdict = { isValid: true };
		const data = this.state.descriptionEntry;

		data.key.error = FieldDataService.registerValidator(
			data.key.value,
			verdict,
			Validators.validateNull,
			(d) => {
				for (let dl of this.state.descriptionLabels) {
					if (dl.key === d.trim()) {
						return d + " already exists";
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

		this.mutateState((p) => {
			p.descriptionEntry.key = data.key;
			p.descriptionEntry.value = data.value;
		});

		return verdict.isValid;
	}
}
