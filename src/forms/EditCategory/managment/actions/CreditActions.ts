import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class CreditActions extends StateUtils<EditCategory.State> {
	validateAdd() {
		// check if the both are number and not empty
	}
	addCredit() {
		this.mutateState((p) => {
			p.creditInput.key;
			p.creditInput.value;

			// add in
			p.credit;
		});
	}
	modifyCreditValue(data: string, i: number) {}
	deleteCredit(i: number) {
		this.mutateState((p) => {
			p.credit = p.credit.filter((v, k) => i !== k);
		});
	}
}
