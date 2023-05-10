import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class SecondFormActions extends StateUtils<AddItem.State> {
	setOnline(data: string) {
		this.mutateState((p) => {
			p.margin.online.value = data;
		});
	}
	setCash(data: string) {
		this.mutateState((p) => {
			p.margin.cash.value = data;
		});
	}
	validate() {
		let verdict = true;
		const err: { [key: string]: string | undefined } = {};

		if (this.state.margin.cash.value === "") {
			err.cash = "required";
			verdict = false;
		} else if (Number.isNaN(parseFloat(this.state.margin.cash.value))) {
			err.cash = "not a number";
			verdict = false;
		} else {
			const parsed = parseFloat(this.state.margin.cash.value);
			if (parsed <= 0) {
				err.cash = "cannot be zero or negative";
				verdict = false;
			}
		}

		if (this.state.margin.online.value === "") {
			err.online = "required";
			verdict = false;
		} else if (Number.isNaN(parseFloat(this.state.margin.online.value))) {
			err.online = "not a number";
			verdict = false;
		} else {
			const parsed = parseFloat(this.state.margin.online.value);
			if (parsed <= 0) {
				err.online = "cannot be zero or negative";
				verdict = false;
			}
		}

		this.mutateState((p) => {
			p.margin.cash.error = err.cash;
			p.margin.cash.isValid = !err.cash;

			p.margin.online.error = err.online;
			p.margin.online.isValid = !err.online;
		});

		return verdict;
	}
}
