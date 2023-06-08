import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import fetchPreData from "../fetch/services/fetchPreData";
import { nanoid } from "nanoid";
import saveEditData, {
	EditCompanyProductData,
} from "../fetch/services/saveEditData";
import SaveImage from "@src/modules/ImageServerUtils/services/SaveImage";

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

	async save(id: string, by: NameIdPair) {
		const _ = this.state;
		const d: EditCompanyProductData = {
			id,
			description: _.description.value,
			descriptionLabels: _.descriptionLabels.map((v, i) => ({
				key: v.key,
				value: v.value.value,
				position: i,
			})),
			images: _.images.filter((v) => !v.deleted).map((v) => v.link),
			deletedImages: _.images.filter((v) => v.deleted).map((v) => v.link),
			priceField: _.priceStructure
				.filter((v) => v.value.hasChanged)
				.map((v) => ({ id: v._id, value: parseFloat(v.value.value) })),
			by,
			gst: {
				type: _.gst.type,
				value: parseFloat(_.gst.value.value),
			},
		};

		if (_.imageFiles && _.imageFiles.length !== 0) {
			const res = await this.handleAsync("saveImages", () =>
				SaveImage(_.imageFiles)
			);
			if(res) {
				d.images = d.images.concat(res.data);
			}
		}

		await this.handleAsync("save", () => saveEditData(d));
	}
}
