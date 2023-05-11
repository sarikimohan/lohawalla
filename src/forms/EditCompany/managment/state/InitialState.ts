import { FieldDataService } from "@src/modules/FieldData/FieldData";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

const InitialState = {
	companyName: FieldDataService.getDefaultField(),
	description: FieldDataService.getDefaultField(),
	images: [],
	addedImages: [],
	imageFiles: [],
	priceStructure: [],
	tempPriceStructure: [],
	descriptionLabels: [],
	loading: {
		saveImage: AsyncStateFactory(),
		saveData: AsyncStateFactory(),
	},
};

export default InitialState;
