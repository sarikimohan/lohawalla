import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import axios from "axios";
import checkIsNameUnique from "../../fetch/services/checkIsNameUnique";
import checkIsCodeUnique from "../../fetch/services/checkIsCodeUnique";

export default class AddCategoryActions extends ServerStateUtils<AddCategory.State> {
	validateFirstForm() {
		this.validateCategoryName();
		this.validateCategoryCode();

		const err: { [key: string]: string | undefined } = {};
		const verdict = { isValid: true };

		err.name = FieldDataService.registerValidator(
			this.state.firstForm.categoryCode.value,
			verdict,
			Validators.validateNull
		);

		err.code = FieldDataService.registerValidator(
			this.state.firstForm.categoryCode.value,
			verdict,
			Validators.validateNull
		);

		err.unit = FieldDataService.registerValidator(
			this.state.firstForm.unit.value,
			verdict,
			Validators.validateNull
		);

		err.description = FieldDataService.registerValidator(
			this.state.firstForm.description.value,
			verdict,
			Validators.validateNull
		);

		this.mutateState((p) => {
			p.firstForm.categoryCode.error = err.code;
			p.firstForm.categoryCode.error = err.name;
			p.firstForm.description.error = err.description;
			p.firstForm.unit.error = err.unit;
			p.firstForm.categoryCode.isValid = !err.code;
			p.firstForm.categoryCode.isValid = !err.name;
			p.firstForm.description.isValid = !err.description;
			p.firstForm.unit.isValid = !err.unit;
		});

		return verdict.isValid;
	}

	validateSecondForm() {
		const verdict = { isValid: true };

		let verdicts: (string | undefined)[] = [];
		// validating the credit
		for (let c of this.state.credit) {
			verdicts.push(
				FieldDataService.registerValidator(
					c.value.value,
					verdict,
					Validators.validateNull,
					Validators.validateFloat,
					(d) => {
						if (c.type === "percentage" && parseFloat(d) > 100)
							return "percentage cannot be more than 100";
					}
				)
			);
		}

		// validating the negotiation
		this.mutateState((p) => {
			p.negotiation.error = FieldDataService.registerValidator(
				p.negotiation.value,
				verdict,
				Validators.validateNull,
				Validators.validateFloat,
				(d) => {
					if (parseFloat(d) > 100) return "percentage cannot be more than 100";
				}
			);

			for (let i = 0; i < p.credit.length; ++i) {
				p.credit[i].value.error = verdicts[i];
			}
		});

		return verdict.isValid;
	}

	validateCategoryName(verdict?: { isValid: boolean }) {
		let data = this.state.firstForm.categoryName;
		data.isValid = true;

		this.mutateState((p) => {
			p.loading.checkName.status = "initialized";
		});
		checkIsNameUnique(data.value)
			.then(({ data: res }) => {
				if (res === false) {
					data.isValid = false;
					data.error = `category name ${data.value} already exists`;
					
				}

				this.mutateState((p) => {
					p.loading.checkName.status = "success";
				});
			})
			.catch((err) => {
				data.isValid = false;
				data.error = "server error, cannot check uniqueness of name";

				this.mutateState((p) => {
					p.loading.checkName.status = "failed";
				});
			})
			.finally(() => {
				this.mutateState((p) => {
					p.loading.checkName.status = "dormant";
					p.firstForm.categoryName = data;
				});
			});
	}

	validateCategoryCode() {
		let data = this.state.firstForm.categoryCode;
		data.isValid = true;
		// load start
		this.mutateState((p) => {
			p.loading.checkCode.status = "initialized";
		});
		checkIsNameUnique(data.value)
			.then(({ data: res }) => {
				if (res === false) {
					data.isValid = false;
					data.error = `category code ${data.value} already exists`;
				}

				this.mutateState((p) => {
					p.loading.checkCode.status = "success";
				});
			})
			.catch((err) => {
				data.isValid = false;
				data.error = "server error, cannot check uniqueness of code";

				this.mutateState((p) => {
					p.loading.checkCode.status = "failed";
				});
			})
			.finally(() => {
				this.mutateState((p) => {
					p.loading.checkCode.status = "dormant";
					p.firstForm.categoryCode = data;
				});
			});
	}

	validateThirdForm() {
		const verdict = { isValid: true };
		let verdicts: (string | undefined)[] = [];
		for (let d of this.state.descriptionLabels) {
			const check = FieldDataService.registerValidator(
				d.value.value,
				verdict,
				Validators.validateNull
			);
			verdicts.push(check);
		}

		this.mutateState((p) => {
			for (let i = 0; i < verdicts.length; ++i) {
				p.descriptionLabels[i].value.error = verdicts[i];
			}
		});

		return verdict.isValid;
	}
}
