import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class FirstFormActions extends StateUtils<AddItem.State> {
	setName(name: string) {
		this.mutateState((p) => {
			p.itemName.value = name;
		});
	}
	setHSNCode(code: string) {
		this.mutateState((p) => {
			p.itemHSNCode.value = code;
		});
	}
	setCode(code: string) {
		this.mutateState((p) => {
			p.itemCode.value = code;
		});
	}
	setDescription(desc: string) {
		this.mutateState((p) => {
			p.description.value = desc;
		});
	}

	validate() {
		let verdict = true;
		const err: { [key: string]: string | undefined } = {};

		if (this.state.itemName.value === "") {
			err.itemName = "required";
			verdict = false;
		}
		if (this.state.itemHSNCode.value === "") {
			err.itemHSNCode = "required";
			verdict = false;
		} else {
			const parse = parseInt(this.state.itemHSNCode.value);
			if (Number.isNaN(parse)) {
				err.itemHSNCode = "not a valid number";
				verdict = false;
			}
		}
		if (this.state.itemCode.value === "") {
			err.itemCode = "required";
			verdict = false;
		}
		if (this.state.description.value === "") {
			err.description = "required";
			verdict = false;
		}

		this.mutateState((p) => {
			p.itemName.error = err.itemName;
			p.itemCode.error = err.itemCode;
			p.itemHSNCode.error = err.itemHSNCode;
			p.description.error = err.description;
			p.itemName.isValid = !err.itemName;
			p.itemCode.isValid = !err.itemCode;
			p.itemHSNCode.isValid = !err.itemHSNCode;
			p.description.isValid = !err.description;
		});

		return verdict;
	}
}
