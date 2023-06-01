import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import { nanoid } from "nanoid";

export default class SecondFormActions extends StateUtils<AddCompany.State> {
	editField(data: string, i: number) {
		this.mutateState((p) => {
			p.priceStructure[i].value.value = data;
		});
	}

	fixField(isFixed: boolean, i: number) {
		this.mutateState((p) => {
			p.priceStructure[i].fixed = isFixed;
			if (isFixed === false) {
				p.priceStructure[i].value.value = "";
			}
		});
	}

	deletePriceStructure(i: number) {
		this.mutateState((p) => {
			p.priceStructure = p.priceStructure.filter((v, k) => k !== i);
		});
	}

	//* add price field form
	flushTemp() {
		this.mutateState((p) => {
			p.tempPriceStructure = [
				{
					id: nanoid(),
					name: { value: "" },
					type: "numeric",
					operation: "add",
				},
			];
		});
	}

	addPriceField() {
		this.mutateState((p) => {
			const ps = p.tempPriceStructure;
			ps.push({
				id: nanoid(),
				name: { value: "" },
				type: "numeric",
				operation: "add",
			});
			p.tempPriceStructure = ps;
		});
	}

	deletePriceField(i: number) {
		this.mutateState((p) => {
			p.tempPriceStructure = p.tempPriceStructure.filter((v, k) => k !== i);
		});
	}

	setDescription(data: string, i: number) {
		this.mutateState((p) => {
			p.tempPriceStructure[i].name.value = data;
		});
	}
	setType(data: PercNum, i: number) {
		this.mutateState((p) => {
			p.tempPriceStructure[i].type = data;
		});
	}
	setOperation(data: OpType, i: number) {
		this.mutateState((p) => {
			p.tempPriceStructure[i].operation = data;
		});
	}

	saveTempPriceField() {
		this.mutateState((p) => {
			p.priceStructure = p.priceStructure.concat(
				p.tempPriceStructure.map((v) => ({
					id: v.id,
					name: v.name.value.trim(),
					value: { value: "" },
					fixed: v.name.value === "basic rate",
					type: v.type,
					operation: v.operation,
				}))
			);
		});
	}

	validateAddForm() {
		let isValid = true;

		this.mutateState((p) => {
			p.tempPriceStructure = p.tempPriceStructure.map((v) => {
				if (v.name.value === "") {
					v.name.error = "required";
					v.name.isValid = false;
					isValid = false;
				} else {
					v.name.error = undefined;
					v.name.isValid = true;
				}
				return v;
			});
		});

		//@ts-ignore
		if (isValid === false) return false;

		const obj: { [key: string]: boolean | undefined } = {};

		for (let i = 0; i < this.state.priceStructure.length; ++i) {
			obj[this.state.priceStructure[i].name.trim()] = true;
		}

		let verdict: (string | undefined)[] = [];
		for (let i = 0; i < this.state.tempPriceStructure.length; ++i) {
			const pf = this.state.tempPriceStructure[i];
			if (obj[pf.name.value.trim()]) {
				verdict.push("value already exists");
				isValid = false;
			} else {
				obj[pf.name.value] = true;
				verdict.push(undefined);
			}
		}

		this.mutateState((p) => {
			for (let i = 0; i < p.tempPriceStructure.length; ++i) {
				p.tempPriceStructure[i].name.error = verdict[i];
				p.tempPriceStructure[i].name.isValid = !verdict[i];
			}
		});

		return isValid;
	}
	validatePriceFieldForm() {
		let isValid = true;
		this.mutateState((p) => {
			for (let i = 0; i < p.priceStructure.length; ++i) {
				let pf = p.priceStructure[i];
				if (pf.fixed === true && pf.value.value === "") {
					p.priceStructure[i].value.error = "required";
					p.priceStructure[i].value.isValid = false;
					isValid = false;
				} else {
					p.priceStructure[i].value.error = undefined;
					p.priceStructure[i].value.isValid = true;
				}
			}
		});

		return isValid;
	}
}
