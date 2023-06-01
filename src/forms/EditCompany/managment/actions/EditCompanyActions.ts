import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import getPrevData from "../../fetch/services/getPrevData";
import ValueChange from "@src/modules/ValueChange/ValueChangeImpl";
import { nanoid } from "nanoid";
import editCompanyData from "../../fetch/services/editCompanyData";
import SaveImage from "@src/modules/ImageServerUtils/services/SaveImage";

export default class EditCompanyActions extends ServerStateUtils<
	StateWithLoading<EditCompany.State>
> {
	async fetch(id: string) {
		const res = await this.handleAsync("fetch", () => getPrevData(id));

		if (res) {
			const { data } = res;

			if (data) {
				this.mutateState((p) => {
					p.companyName = new ValueChange(data.companyName);
					p.description = data.description;
					p.images = data.images.map((v) => ({ link: v, deleted: false }));
					p.priceStructure = data.priceStructure.map((v, i) => ({
						_id: v._id,
						name: v.name,
						value: v.value ? v.value.toString() : "",
						isFixed: v.isFixed,
						type: v.type,
						operation: v.operation,
					}));
					p.descriptionLabels = data.descriptionLabels.map((v, i) => ({
						id: nanoid(),
						key: v.key,
						value: v.value,
					}));
				});
			}
		}
	}

	async save(_id: string, by: NameIdPair) {
		const state = this.state;
		let uploadedImages: string[] = [];

		// saving the images
		const res = await this.handleAsync("saveImages", () =>
			SaveImage(state.imageFiles)
		);

		if (res) {
			uploadedImages = res.data;
		}

		await this.handleAsync("save", () =>
			editCompanyData({
				_id,
				companyName: state.companyName.getValue(),
				description: state.description,
				images: state.images
					.filter((v) => !v.deleted)
					.map((v) => v.link)
					.concat(uploadedImages),
				deletedImages: state.images.filter((v) => v.deleted).map((v) => v.link),
				priceStructure: state.priceStructure.map((v, i) => ({
					...v,
					position: i,
					value: v.value === "" ? null : parseFloat(v.value),
				})),
				deletedId: state.deletedId,
				descriptionLabels: state.descriptionLabels.map((v, i) => ({
					key: v.key,
					value: v.value,
					position: i,
				})),
				by,
			})
		);
	}
}
