import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class EditCategoryActions extends StateUtils<EditCategory.State> {
	setName(d: string) {
		this.mutateState((p) => {
			p.categoryName.value = d;
		});
	}
	setCode(d: string) {
		this.mutateState((p) => {
			p.categoryCode.value = d;
		});
	}
	setDescription(d: string) {
		this.mutateState((p) => {
			p.description.value = d;
		});
	}

	setNegotiation(d: string) {
		this.mutateState((p) => {
			p.negotiation.value = d;
		});
	}

	setUnit(d: string) {
		this.mutateState((p) => {
			p.unit.value = d;
		});
	}

	validateForm() {
		const verdict = {
			isValid: true,
		};
		const err: {
			name?: string;
			code?: string;
			des?: string;
			neg?: string;
			unit?: string;
		} = {
			name: undefined,
			code: undefined,
			des: undefined,
		};

		err.name = FieldDataService.registerValidator(
			this.state.categoryName.value,
			verdict,
			Validators.validateNull
		);
		err.code = FieldDataService.registerValidator(
			this.state.categoryCode.value,
			verdict,
			Validators.validateNull
		);
		err.des = FieldDataService.registerValidator(
			this.state.description.value,
			verdict,
			Validators.validateNull
		);
		err.neg = FieldDataService.registerValidator(
			this.state.negotiation.value,
			verdict,
			Validators.validateNull
		);
		err.unit = FieldDataService.registerValidator(
			this.state.unit.value,
			verdict,
			Validators.validateNull
		);

		this.mutateState((p) => {
			p.categoryName.error = err.name;
			p.categoryName.isValid = !err.name;

			p.categoryCode.error = err.code;
			p.categoryCode.isValid = !err.code;

			p.description.error = err.des;
			p.description.isValid = !err.des;

			p.negotiation.error = err.neg;
			p.negotiation.isValid = !err.neg;

			p.unit.error = err.unit;
			p.unit.isValid = !err.unit;
		});

		// check for the credit
		let creditValueValidation: (string | undefined)[] = [];
		for (let i = 0; i < this.state.credit.length; i++) {
			const credit = this.state.credit[i];

			creditValueValidation.push(
				FieldDataService.registerValidator(
					credit.value.value,
					verdict,
					Validators.validateNull,
					Validators.validateFloat,
					(d) => {
						const parsed = parseFloat(d);
						if (credit.type === "percentage" && parsed > 100) {
							return "percentage value cannot be more than 100";
						}
					}
				)
			);
		}

		this.mutateState((p) => {
			for (let i = 0; i < p.credit.length; i++) {
				p.credit[i].value.error = creditValueValidation[i];
				p.credit[i].value.isValid = !creditValueValidation[i];
			}
		});

		// check for description labels
		let validation: (string | undefined)[] = [];
		for (let i = 0; i < this.state.descriptionLabels.length; ++i) {
			const desc = this.state.descriptionLabels[i];

			if (desc.value.value === "") {
				validation.push("required");
				verdict.isValid = false;
			} else {
				validation.push(undefined);
			}
		}

		this.mutateState((p) => {
			for (let i = 0; i < p.descriptionLabels.length; ++i) {
				const label = p.descriptionLabels[i];
				label.value.error = validation[i];
				label.value.isValid = !validation[i];
			}
		});

		return verdict.isValid;
	}
}
