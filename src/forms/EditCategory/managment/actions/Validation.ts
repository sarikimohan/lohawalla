import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class Validation extends StateUtils<EditCategory.State> {
	valiateName() {
		const verdict = { isValid: true };
		const data = this.state.categoryName;

		data.error = FieldDataService.registerValidator(
			data.value,
			verdict,
			Validators.validateNull,
			//   Validators.validateFloat,
			//   (d) => Validators.min(d, 0)
		);
		data.isValid = !data.error;

		this.mutateState(p => {
			p.categoryName = data;
		})

		return verdict.isValid;
	}
	validateCode() {
		const verdict = { isValid: true };
		const data = this.state.categoryCode;
		data.error = FieldDataService.registerValidator(
			data.value,
			verdict,
			Validators.validateNull
		);
		data.isValid = !data.error;

		this.mutateState(p => {
			p.categoryCode = data;
		})

		return verdict.isValid;
	}
	validateDescription() {
		const verdict = { isValid: true };
		const data = this.state.description;
		data.error = FieldDataService.registerValidator(
			data.value,
			verdict,
			Validators.validateNull
		);
		data.isValid = !data.error;

		this.mutateState(p => {
			p.description = data;
		})

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
		data.isValid = !data.error;

		this.mutateState(p => {
			p.negotiation = data;
		})

		return verdict.isValid;
	}
	validateAddCredit() {

	}
	validateCredits() { }
	validateAddDescription() { }
	validateDescriptions() { }
}
