import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import { nanoid } from "nanoid";

export default class DescriptionActions extends StateUtils<EditCategory.State> {
	addField() {

	}
	deleteField(i: number) {
	
	}
	updateField(data: string, i: number) {
	
	}

	setAddKey(data: string) {

	}

	setAddValue(data: string) {
	
	}

	validateAdd() {
		let verdict = true;
		const err: {
			key?: string;
			value?: string;
		} = {
			key: undefined,
			value: undefined,
		};

		for (let d of this.state.descriptionLabels) {
		
		}

		this.mutateState((p) => {

		});
    
		return verdict;
	}
	validateAll() {
		let verdict = true;
		let validation: (string | undefined)[] = [];
		for (let i = 0; i < this.state.descriptionLabels.length; ++i) {
			const desc = this.state.descriptionLabels[i];

		}

		this.mutateState((p) => {
			for (let i = 0; i < p.descriptionLabels.length; ++i) {
				const label = p.descriptionLabels[i];
			}
		});

		return verdict;
	}
}
