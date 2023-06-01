import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import getEditItemFormData from "../fetch/services/getEditItemFormData";
import { nanoid } from "nanoid";
import React from "react";
import editItem, { EditItemData } from "../fetch/services/editItem";
import ValueChange from "@src/modules/ValueChange/ValueChangeImpl";
import getAllUnits from "@src/forms/AddItem/fetch/service/getAllUnits";

export default class EditItemActions extends ServerStateUtils<EditItem.State> {
	constructor(
		state: EditItem.State,
		setState: React.Dispatch<React.SetStateAction<EditItem.State>>
	) {
		super(state, setState);
	}
	async fetch(id: string) {
		const res = await this.handleAsync("fetch", () => getEditItemFormData(id));
		const units = await this.handleAsync("fetchUnits", () => getAllUnits());
		if (res && units) {
			this.mutateState((p) => {
				const data = res.data;

				p.itemName = new ValueChange(data.itemName);
				p.itemCode = new ValueChange(data.itemCode);
				p.itemHSNCode = data.itemHSNCode.toString();
				p.description = data.description;
				p.unit = null;
				const { unit } = data;
				p.unit = {
					id: unit.id,
					name: unit.name,
					weight: unit.weight,
					value: unit.value ? unit.value.toString() : null,
				};
				console.log("received unit was ", data.unit);
				p.unitList = units.data;
				p.images = data.images.map((v) => ({ link: v, deleted: false }));
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
		if (this.state.unit === null) {
			throw new Error("no unit present");
		}

		if (this.state.unit.weight === null && this.state.unit.value === null) {
			throw new Error("value has to be present if weight is absent");
		}

		const d: EditItemData = {
			id,
			unit: {
				unitId: this.state.unit.id,
				weight: this.state.unit.weight
					? null
					: parseFloat(this.state.unit.value as string),
			},
			name: this.state.itemName.getValue(),
			code: this.state.itemCode.getValue(),
			HSNCode: parseInt(this.state.itemHSNCode),
			description: this.state.description,
			images: this.state.images.filter((v) => !v.deleted).map((v) => v.link),
			deletedImages: this.state.images
				.filter((v) => v.deleted)
				.map((v) => v.link),
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
