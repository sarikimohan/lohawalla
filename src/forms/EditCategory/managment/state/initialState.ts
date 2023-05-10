import { FieldDataService } from "@src/modules/FieldData/FieldData";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

const InitialState: EditCategory.State = {
	categoryName: FieldDataService.getDefaultField(),
	categoryCode: FieldDataService.getDefaultField(),
	description: FieldDataService.getDefaultField(),
	images: [],
	addedImages: [],
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
};

export default InitialState;
