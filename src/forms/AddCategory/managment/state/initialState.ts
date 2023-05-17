import { FieldDataService } from "@src/modules/FieldData/FieldData";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState = {
	page: 0,
	loading: {
		save: AsyncStateFactory(),
		checkName: AsyncStateFactory(),
		checkCode: AsyncStateFactory(),
	},
	firstForm: {
		categoryName: FieldDataService.getDefaultField(),
		categoryCode: FieldDataService.getDefaultField(),
		description: FieldDataService.getDefaultField(),
		unit: FieldDataService.getDefaultField(),
		unitSelect: {
			showDropDown: false,
			list: [
				{
					name: "ton",
					weight: 1000,
				},
				{
					name: "kg",
					weight: 1,
				},
				{
					name: "bundle",
					weight: -1,
				},
				{
					name: "custom",
					weight: -1,
				},
			],
			selected: null,
			showWeightInput: false,
			showUnitNameInput: false,
		},
	},
	images: [],
	credit: [],
	creditInput: {
		key: FieldDataService.getDefaultField(),
		value: FieldDataService.getDefaultField(),
	},
	descriptionLabels: [],
	descriptionEntry: {
		key: FieldDataService.getDefaultField(),
		value: FieldDataService.getDefaultField(),
	},
	negotiation: FieldDataService.getDefaultField(),
};
