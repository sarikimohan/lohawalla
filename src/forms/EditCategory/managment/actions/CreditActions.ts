import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class CreditActions extends StateUtils<EditCategory.State> {
	validateAdd() {
		// check if the both are number and not empty
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
				type: "numeric",
			});
		});
	}
	modifyCreditValue(data: string, i: number) {}
	deleteCredit(i: number) {
		this.mutateState((p) => {
			p.credit = p.credit.filter((v, k) => i !== k);
		});
	}
}
