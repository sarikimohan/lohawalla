import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import getPreData from "../../fetch/services/getPreData";
import { nanoid } from "nanoid";
import saveEditCategory, {
	EditData,
} from "../../fetch/services/saveEditCategory";
import React from "react";
import { Handle } from "../../EditCategory";

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
				p.images = d.images;
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

		const d: EditData = {
			id,
			name: this.state.categoryName,
			code: this.state.categoryCode,
			discription: this.state.description,
			negotiation: parseFloat(this.state.negotiation),
			image: this.state.images,
			credit: this.state.credit.map((v) => {
				return {
					days: v.days,
					value: parseFloat(v.value),
					type: v.type,
				};
			}),
			descriptionLabels: this.state.descriptionLabels.map((v, i) => ({
				key: v.key,
				value: v.value,
				position: i,
			})),
			by,
		};

		await this.handleAsync("saveData", () => saveEditCategory(d));
	}
}
