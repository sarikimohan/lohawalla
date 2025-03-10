import { FieldDataService } from "@src/modules/FieldData/FieldData";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

const InitialState = {
	page: 1,
	firstForm: {
		companiesList: [],
		categoryList: [],
		itemList: [],
		imageList: null,
		selectedCompany: {value: null},
		selectedCategory: {value: null},
		selectedItem: {value: null},
	},
	secondForm: {
		hasVisited: false,
		priceStructure: [],
		margin: {
			online: 0,
			cash: 0,
		},
		credits: [],
		negotiation: 0,
		gst: {
			type: "percentage",
			value: FieldDataService.getDefaultField(),
		},
	},
	thirdForm: {
		description: FieldDataService.getDefaultField(),
		descriptionLabels: [],
		descriptionEntry: {
			key: FieldDataService.getDefaultField(),
			value: FieldDataService.getDefaultField(),
		},
	},
	loading: {
		save: AsyncStateFactory()
	}
};

export default InitialState;
