import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import getEditItemFormData from "../fetch/services/getEditItemFormData";
import {nanoid} from "nanoid";

export default class EditItemActions extends ServerStateUtils<EditItem.State> {
	async fetch(id: string) {
		const res = await this.handleAsync("fetch", () => getEditItemFormData(id));
		if (res) {
			this.mutateState((p) => {
				const data = res.data;

				p.itemName.value = data.itemName;
				p.itemCode.value = data.itemCode;
				p.itemHSNCode.value = data.itemHSNCode.toString();
				p.description.value = data.description;
				p.images = data.images;
				p.margin.cash.value = data.margin.cash.toString();
				p.margin.online.value = data.margin.online.toString();
				p.descriptionLabels = data.descriptionLabels.map((v) => ({
					id: nanoid(),
					key: v.key,
					value: { value: v.value },
					position: v.position,
				}));
			});
		}
	}

	addDescription() {
		
	}
}
