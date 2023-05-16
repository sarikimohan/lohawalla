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
      Validators.validateFloat,
      (d) => Validators.min(d, 0)
		);
    data.isValid = !data.error;

    this.mutateState(p => {
      p.categoryName = data;
    })

    return verdict.isValid;
	}
	validateCode() {
    // ex 
  }
	validateDescription() {}
	validateAddCredit() {}
	validateCredits() {}
	validateAddDescription() {}
	validateDescriptions() {}
}
