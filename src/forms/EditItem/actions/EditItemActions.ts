import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import getEditItemFormData from "../fetch/services/getEditItemFormData";
import { nanoid } from "nanoid";
import React from "react";
import editItem, { EditItemData } from "../fetch/services/editItem";
import ValueChange from "@src/modules/ValueChange/ValueChangeImpl";

export default class EditItemActions extends ServerStateUtils<EditItem.State> {
	constructor(
		state: EditItem.State,
		setState: React.Dispatch<React.SetStateAction<EditItem.State>>
	) {
		super(state, setState);
	}
	async fetch(id: string) {
		const res = await this.handleAsync("fetch", () => getEditItemFormData(id));
		if (res) {
			this.mutateState((p) => {
				const data = res.data;

				p.itemName = new ValueChange(data.itemName);
				p.itemCode = new ValueChange(data.itemCode);
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
			this.mutateState((p) => {
				p.validation = p.validation && d;
				p.validationCount++;
			});
		};
	}

	async save(id: string, by: NameIdPair) {
		const d: EditItemData = {
			id,
			name: this.state.itemName.getValue(),
			code: this.state.itemCode.getValue(),
			HSNCode: parseInt(this.state.itemHSNCode),
			description: this.state.description,
			images: this.state.images,
			margin: {
				online: parseInt(this.state.margin.online),
				cash: parseInt(this.state.margin.cash),
			},
			descriptionLabels: this.state.descriptionLabels.map((v, i) => ({
				...v,
				position: i,
			})),
			by,
		};

		await this.handleAsync("saveData", () => editItem(d));
	}
}
