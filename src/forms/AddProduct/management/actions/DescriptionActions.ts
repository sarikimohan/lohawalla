import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import { nanoid } from "nanoid";

export default class DescriptionActions extends StateUtils<AddProduct.State> {
	addField() {
		this.mutateState((p) => {
			p.thirdForm.descriptionLabels.push({
				id: nanoid(),
				key: p.thirdForm.descriptionEntry.key.value,
				value: { value: p.thirdForm.descriptionEntry.value.value },
			});
			p.thirdForm.descriptionEntry.value.value = "";
			p.thirdForm.descriptionEntry.key.value = "";
		});
	}
	deleteField(i: number) {
		this.mutateState((p) => {
			p.thirdForm.descriptionLabels = p.thirdForm.descriptionLabels.filter(
				(d, k) => k !== i
			);
		});
	}
	updateField(data: string, i: number) {
		this.mutateState((p) => {
			p.thirdForm.descriptionLabels[i].value.value = data;
		});
	}

	setAddKey(data: string) {
		this.mutateState((p) => {
			p.thirdForm.descriptionEntry.key.value = data;
		});
	}

	setAddValue(data: string) {
		this.mutateState((p) => {
			p.thirdForm.descriptionEntry.value.value = data;
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

		if (this.state.thirdForm.descriptionEntry.key.value === "") {
			err.key = "required";
			verdict = false;
		}

		if (this.state.thirdForm.descriptionEntry.value.value === "") {
			err.value = "required";
			verdict = false;
		}

		for (let d of this.state.thirdForm.descriptionLabels) {
			if (d.key === this.state.thirdForm.descriptionEntry.key.value) {
				err.key = "already present";
				verdict = false;
				break;
			}
		}

		this.mutateState((p) => {
			p.thirdForm.descriptionEntry.key.error = err.key;
			p.thirdForm.descriptionEntry.key.isValid = !err.key;

			p.thirdForm.descriptionEntry.value.error = err.value;
			p.thirdForm.descriptionEntry.value.isValid = !err.value;
		});

		return verdict;
	}
	validateAll() {
		let verdict = true;
		let validation: (string | undefined)[] = [];
		for (let i = 0; i < this.state.thirdForm.descriptionLabels.length; ++i) {
			const desc = this.state.thirdForm.descriptionLabels[i];

			if (desc.value.value === "") {
				validation.push("required");
				verdict = false;
			} else {
				validation.push(undefined);
			}
		}

		this.mutateState((p) => {
			for (let i = 0; i < p.thirdForm.descriptionLabels.length; ++i) {
				const label = p.thirdForm.descriptionLabels[i];
				label.value.error = validation[i];
				label.value.isValid = !validation[i];
			}
		});

		return verdict;
	}
}
