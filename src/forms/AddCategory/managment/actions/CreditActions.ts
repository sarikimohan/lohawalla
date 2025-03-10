import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import { nanoid } from "nanoid";

export default class CreditActions extends StateUtils<AddCategory.State> {
	validateAdd() {
		const vrdct = {
			isValid: true,
		};
		const err: {
			key?: string;
			value?: string;
		} = {
			key: undefined,
			value: undefined,
		};

		const keyVal = this.state.creditInput.key.value;
		const valueVal = this.state.creditInput.value.value;

		err.key = FieldDataService.registerValidator(
			keyVal,
			vrdct,
			Validators.validateNull,
			Validators.validateInt,
			(e) => {
				for (let i of this.state.credit) {
					if (keyVal === i.days.toString()) {
						return keyVal + " already exists";
					}
				}
			}
		);

		err.value = FieldDataService.registerValidator(
			valueVal,
			vrdct,
			Validators.validateNull,
			Validators.validateFloat,
			(d) => {
				const parsed = parseFloat(d);
				if (parsed > 100) return "cannot be more than 100";
			}
		);

		this.mutateState((p) => {
			p.creditInput.key.error = err.key;
			p.creditInput.key.isValid = !err.key;

			p.creditInput.value.error = err.value;
			p.creditInput.value.isValid = !err.value;
		});

		return vrdct.isValid;
	}

	addCredit() {
		this.mutateState((p) => {
			p.credit.push({
				id: nanoid(),
				days: parseInt(p.creditInput.key.value.trim()),
				value: { value: p.creditInput.value.value.trim() },
				type: "percentage",
			});
			p.creditInput.key.value = "";
			p.creditInput.value.value = "";
		});
	}
	modifyCreditValue(data: string, i: number) {
		this.mutateState((p) => {
			p.credit[i].value.value = data;
		});
	}
	modityCreditType(isNumeric: boolean, i: number) {
		this.mutateState((p) => {
			p.credit[i].type = isNumeric ? "numeric" : "percentage";
		});
	}
	deleteCredit(i: number) {
		this.mutateState((p) => {
			p.credit = p.credit.filter((v, k) => i !== k);
		});
	}
}
