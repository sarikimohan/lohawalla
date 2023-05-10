import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class CreditActions extends StateUtils<EditCategory.State> {
	validateAdd() {
		// check if the both are number and not empty
		let verdict = true
		const err: {
			key?: string,
			value?: string
		} = {
			key: undefined,
			value: undefined
		}

		parseInt(this.state.creditInput.key.value)
		const req = "required"
		if (this.state.creditInput.key.value === "" && Number.isNaN(this.state.creditInput.key.value)) {
			err.key = req
			verdict = false
		}

		parseInt(this.state.creditInput.value.value)
		if (this.state.creditInput.value.value === "" && Number.isNaN(this.state.creditInput.value.value)) {
			err.value = req
			verdict = false
		}

		this.mutateState(p => {
			p.creditInput.key.error = err.key
			p.creditInput.key.isValid = !err.key

			p.creditInput.value.error = err.value
			p.creditInput.value.isValid = !err.value
		})
		return verdict
	}

	addCredit() {
		this.mutateState((p) => {

		});
	}
	modifyCreditValue(data: string, i: number) {
		this.mutateState(p => {
			p.credit[i].value.value = data
		})
	}
	deleteCredit(i: number) {
		this.mutateState((p) => {
			p.credit = p.credit.filter((v, k) => i !== k);
		});
	}
}
