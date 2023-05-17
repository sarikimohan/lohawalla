import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import getEditItemFormData from "../fetch/services/getEditItemFormData";
import { nanoid } from "nanoid";
import React from "react";

export default class EditItemActions extends ServerStateUtils<EditItem.State> {
	ref: React.MutableRefObject<number>;
	constructor(
		state: EditItem.State,
		setState: React.Dispatch<React.SetStateAction<EditItem.State>>,
		ref: React.MutableRefObject<number>
	) {
		super(state, setState);
		this.ref = ref;
	}
	async fetch(id: string) {
		const res = await this.handleAsync("fetch", () => getEditItemFormData(id));
		if (res) {
			this.mutateState((p) => {
				const data = res.data;

				p.itemName = data.itemName;
				p.itemCode = data.itemCode;
				p.itemHSNCode = data.itemHSNCode.toString();
				p.description = data.description;
				p.images = data.images;
				p.margin.cash = data.margin.cash.toString();
				p.margin.online = data.margin.online.toString();
				p.descriptionLabels = data.descriptionLabels.map((v) => ({
					key: v.key,
					value: v.value,
					position: v.position,
				}));
			});
		}
	}

	setValidation(i: number) {
		return (d: boolean) => {
			this.ref.current++;
			this.mutateState((p) => {
				p.validation = p.validation && d;
				p.validationCount++;
			});
		};
	}
}
