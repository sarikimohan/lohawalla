import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import { nanoid } from "nanoid";

/**
 * editField() 
fixField() 

// empty the value of
flushTemp()
addPriceField()
setDescription()
setType()
setValue() 

validateAddForm() 
validatePriceFieldForm() 
 */
export default class SecondFormActions extends StateUtils<AddCompany.State> {
	editField(data: string, i: number) {
		const value = parseFloat(data);
		if (Number.isNaN(value)) {
			this.mutateState((p) => {
				p.priceStructure[i].value.error = "not a number";
				p.priceStructure[i].value.isValid = false;
			});
		} else {
			this.mutateState((p) => {
				p.priceStructure[i].value.error = undefined;
				p.priceStructure[i].value.isValid = true;
				p.priceStructure[i].value.value = data;
			});
		}
	}

	fixField(isFixed: boolean, i: number) {
		this.mutateState((p) => {
			p.priceStructure[i].fixed = isFixed;
		});
	}

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

	validateAddForm() {
		const obj: { [key: string]: boolean | undefined } = {};

		for (let i = 0; i < this.state.priceStructure.length; ++i) {
			obj[this.state.priceStructure[i].name] = true;
		}

		let verdict: (string | undefined)[] = [];
		for (let i = 0; i < this.state.tempPriceStructure.length; ++i) {
			const pf = this.state.tempPriceStructure[i];
			if (obj[pf.name.value]) {
				verdict.push("value already exists");
			} else {
				verdict.push(undefined);
			}
		}

		this.mutateState((p) => {
			for (let i = 0; i < p.tempPriceStructure.length; ++i) {
				p.tempPriceStructure[i].name.error = verdict[i];
				p.tempPriceStructure[i].name.isValid = !verdict[i];
			}
		});
	}
	validatePriceFieldForm() {
		let isValid = true;
		this.mutateState((p) => {
			for (let i = 0; i < p.priceStructure.length; ++i) {
				let pf = p.priceStructure[i];
				if (pf.value.value === "") {
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
