import { FieldDataService } from "@src/modules/FieldData/FieldData";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

const InitialState: EditCategory.State = {
	page: 0,
	categoryName: FieldDataService.getDefaultField(),
	categoryCode: FieldDataService.getDefaultField(),
	description: FieldDataService.getDefaultField(),
	images: [],
	imageFiles: [],
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
	loading: {
		saveImages: AsyncStateFactory(),
		saveData: AsyncStateFactory(),
	},
	negotiation: FieldDataService.getDefaultField(),
	unit: FieldDataService.getDefaultField(),
};

export default InitialState;
