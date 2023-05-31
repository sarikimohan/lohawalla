import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import getPreData from "../../fetch/services/getPreData";
import { nanoid } from "nanoid";
import saveEditCategory, {
	EditData,
} from "../../fetch/services/saveEditCategory";
import React from "react";
import { Handle } from "../../EditCategory";
import SaveImage from "@src/modules/ImageServerUtils/services/SaveImage";

export default class ServerActions extends ServerStateUtils<EditCategory.State> {
	private ref: React.MutableRefObject<Handle>;

	constructor(
		state: EditCategory.State,
		setState: React.Dispatch<React.SetStateAction<EditCategory.State>>,
		ref: React.MutableRefObject<Handle>
	) {
		super(state, setState);
		this.ref = ref;
	}

	async inflate(id: string) {
		const res = await this.handleAsync("fetchForm", () => getPreData(id));
		if (res) {
			const d = res.data;
			this.mutateState((p) => {
				p.categoryName = d.categoryName;
				p.categoryCode = d.categoryCode;
				p.description = d.description;
				p.images = d.images.map((v) => ({ link: v, deleted: false }));
				p.credit = d.credit.map((v) => ({
					...v,
					id: nanoid(),
					value: v.value.toString(),
				}));
				p.descriptionLabels = d.descriptionLabels.map((v) => ({
					...v,
					id: nanoid(),
				}));

				p.negotiation = d.negotiation.toString();
			});
		}
	}

	async save(id: string, by: NameIdPair) {
		console.log(this.state.images.filter((v) => !v.deleted));
		const d: EditData = {
			id,
			name: this.state.categoryName.trim(),
			code: this.state.categoryCode.trim(),
			discription: this.state.description.trim(),
			negotiation: parseFloat(this.state.negotiation.trim()),
			image: this.state.images.filter((v) => !v.deleted).map((v) => v.link),
			deletedImages: this.state.images
				.filter((v) => v.deleted)
				.map((v) => v.link),
			credit: this.state.credit.map((v) => {
				return {
					days: v.days,
					value: parseFloat(v.value),
					type: v.type,
				};
			}),
			descriptionLabels: this.state.descriptionLabels.map((v, i) => ({
				key: v.key.trim(),
				value: v.value.trim(),
				position: i,
			})),
			by,
		};

		console.log(this.state.imageFiles);

		const res = await this.handleAsync(
			"saveImages",
			() => SaveImage(this.state.imageFiles),
			{
				errMessage: "cannot save images, proceeding to save data",
				successMessage: "successfully saved images",
				initializedMessage: "saving images ...",
			}
		);

		if (res) {
			d.image = d.image.concat(res.data);
		}

		await this.handleAsync("saveData", () => saveEditCategory(d), {
			errMessage:
				"cannot edit category, check for internet connect or try again",
			successMessage: "successfully saved the editing",
			initializedMessage: "saving the changes ...",
		});
	}
}
