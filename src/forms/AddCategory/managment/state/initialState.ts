import { FieldDataService } from "@src/modules/FieldData/FieldData";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: AddCategory.State = {
	page: 0,
	loading: {
		save: AsyncStateFactory(),
	},
	firstForm: {
		categoryName: FieldDataService.getDefaultField(),
		categoryCode: FieldDataService.getDefaultField(),
		description: FieldDataService.getDefaultField(),
		unit: FieldDataService.getDefaultField(),
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
