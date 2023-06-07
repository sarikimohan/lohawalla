import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import fetchPreData from "../fetch/services/fetchPreData";
import { nanoid } from "nanoid";

export default class ServerActions extends ServerStateUtils<EditProduct.State> {
	async fetch(id: string) {
		const res = await this.handleAsync("fetch", () => fetchPreData(id));

		if (!res) return;

		this.mutateState((p) => {
			const data = res.data;

			p.selectedCompany = data.selectedCompany;
			p.selectedItem = data.selectedItem;
			p.selectedCategory = data.selectedCategory;

			p.images = data.images.map((v, i) => ({ link: v, deleted: false }));

			p.priceStructure = data.priceStructure.map((v, i) => ({
				...v,
				value: { value: v.value.toString(), hasChanged: false },
			}));

			p.margin = data.margin;

			p.credits = data.credits;

			p.negotiation = data.negotiation;

			p.gst = { ...data.gst, value: { value: data.gst.value.toString() } };

			p.description = { value: data.description };
			p.descriptionLabels = data.descriptionLabels.map((v, i) => ({
				...v,
				id: nanoid(),
				value: { value: v.value },
			}));
		});
	}
}
