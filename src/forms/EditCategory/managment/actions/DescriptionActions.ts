import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import { nanoid } from "nanoid";

export default class DescriptionActions extends StateUtils<EditCategory.State> {
	addField() {
		this.mutateState((p) => {
			p.descriptionLabels.push({
				id: nanoid(),
				key: p.descriptionEntry.key.value,
				value: { value: p.descriptionEntry.value.value },
			});
			p.descriptionEntry.value.value = "";
			p.descriptionEntry.key.value = "";
		});
	}
	deleteField(i: number) {
		this.mutateState((p) => {
			p.descriptionLabels = p.descriptionLabels.filter((d, k) => k !== i);
		});
	}
	updateField(data: string, i: number) {
		this.mutateState((p) => {
			p.descriptionLabels[i].value.value = data;
		});
	}

	setAddKey(data: string) {
		this.mutateState((p) => {
			p.descriptionEntry.key.value = data;
		});
	}

	setAddValue(data: string) {
		this.mutateState((p) => {
			p.descriptionEntry.value.value = data;
		});
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

		if (this.state.descriptionEntry.key.value === "") {
			err.key = "required";
			verdict = false;
		}

		if (this.state.descriptionEntry.value.value === "") {
			err.value = "required";
			verdict = false;
		}

		for (let d of this.state.descriptionLabels) {
			if (d.key === this.state.descriptionEntry.key.value) {
				err.key = "already present";
				verdict = false;
				break;
			}
		}

		this.mutateState((p) => {
			p.descriptionEntry.key.error = err.key;
			p.descriptionEntry.key.isValid = !err.key;

			p.descriptionEntry.value.error = err.value;
			p.descriptionEntry.value.isValid = !err.value;
		});
    
		return verdict;
	}
	validateAll() {
		let verdict = true;
		let validation: (string | undefined)[] = [];
		for (let i = 0; i < this.state.descriptionLabels.length; ++i) {
			const desc = this.state.descriptionLabels[i];

			if (desc.value.value === "") {
				validation.push("required");
				verdict = false;
			} else {
				validation.push(undefined);
			}
		}

		this.mutateState((p) => {
			for (let i = 0; i < p.descriptionLabels.length; ++i) {
				const label = p.descriptionLabels[i];
				label.value.error = validation[i];
				label.value.isValid = !validation[i];
			}
		});

		return verdict;
	}
}
