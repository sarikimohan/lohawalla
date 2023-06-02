import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import { nanoid } from "nanoid";

export default class SetActions extends StateUtils<EditProduct.State> {
	deleteImage(index: number) {
		this.mutateState((p) => {
			p.images[index].deleted = true;
		});
	}
	setImageFiles(files: File[] | null) {
		this.mutateState((p) => {
			p.imageFiles = files;
		});
	}
	editPriceStructure(value: string, index: number) {
		this.mutateState((p) => {
			p.priceStructure[index].value.value = value;
			p.priceStructure[index].value.hasChanged = true;
		});
	}
	setGst(type: PercNum) {
		this.mutateState((p) => {
			p.gst.type = type;
		});
	}
	setDescription(desc: string) {
		this.mutateState((p) => {
			p.description.value = desc;
		});
	}

	addDescription() {
		this.mutateState((p) => {
			p.descriptionLabels.push({
				id: nanoid(),
				key: this.state.descriptionEntry.key.value.trim(),
				value: { value: this.state.descriptionEntry.value.value.trim() },
			});
			p.descriptionEntry.key.value = "";
			p.descriptionEntry.value.value = "";
		});
	}
	deleteDescription(index: number) {
		this.mutateState((p) => {
			p.descriptionLabels = p.descriptionLabels.filter((v, i) => i !== index);
		});
	}
	setDescriptionKey(key: string) {
		this.mutateState((p) => {
			p.descriptionEntry.key.value = key;
		});
	}
	setDescriptionValue(value: string) {
		this.mutateState((p) => {
			p.descriptionEntry.value.value = value;
		});
	}
	setDescEdit(value: string, index: number) {
		this.mutateState((p) => {
			p.descriptionLabels[index].value.value = value;
		});
	}
}
