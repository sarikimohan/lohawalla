import { FieldDataService } from "@src/modules/FieldData/FieldData";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

const InitialState: EditCategory.State = {
	page: 0,
	categoryName: "",
	categoryCode: "",
	description: "",
	images: [],
	imageFiles: [],
	credit: [],
	creditInput: {
		key: "",
		value: "",
	},
	descriptionLabels: [],
	descriptionEntry: {
		key: "",
		value: "",
	},
	loading: {
		saveImages: AsyncStateFactory(),
		saveData: AsyncStateFactory(),
	},
	negotiation: "",
};

export default InitialState;
