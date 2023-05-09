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

	setDescription(data: string, i: number) {}
	setType(data: PercNum, i: number) {}
	setOperation(data: OpType, i: number) {}

	validateAddForm() {}
	validatePriceFieldForm() {}
}
