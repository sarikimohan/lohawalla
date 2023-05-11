import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class CreditActions extends StateUtils<EditCategory.State> {
	validateAdd() {
		// check if the both are number and not empty
		let verdict = true;
		const err: {
			key?: string;
			value?: string;
		} = {
			key: undefined,
			value: undefined,
		};

		const req = "required";
		const keyVal = this.state.creditInput.key.value;
		const valueVal = this.state.creditInput.value.value;

		if (
			this.state.creditInput.key.value === "" &&
			/^[0-9]*$/.test(keyVal) === false &&
			keyVal[0] !== "0"
		) {
			err.key = req;
			verdict = false;
		}

		if (
			this.state.creditInput.value.value === "" &&
			/^[0-9]*$/.test(valueVal) === false
		) {
			err.value = req;
			verdict = false;
		}

		this.mutateState((p) => {
			p.creditInput.key.error = err.key;
			p.creditInput.key.isValid = !err.key;

			p.creditInput.value.error = err.value;
			p.creditInput.value.isValid = !err.value;
		});
		return verdict;
	}

	addCredit() {
		this.mutateState((p) => {
			const verdict = /^[0-9]*$/.test(p.creditInput.key.value);
			if (verdict === false) {
				return;
			}
			p.credit.push({
				days: parseInt(p.creditInput.key.value),
				value: { value: p.creditInput.value.value },
				type: "percentage",
			});
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
