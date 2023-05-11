import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import axios from "axios";

export default class AddCategoryActions extends StateUtils<AddCategory.State> {
	validateFirstForm() {
		const err: { [key: string]: string | undefined } = {};
		const verdict = { isValid: true };

		err.name = FieldDataService.registerValidator(
			this.state.firstForm.categoryName.value,
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
			p.firstForm.categoryName.error = err.name;
			p.firstForm.description.error = err.description;
			p.firstForm.unit.error = err.unit;
			p.firstForm.categoryCode.isValid = !err.code;
			p.firstForm.categoryName.isValid = !err.name;
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
}
