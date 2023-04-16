import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: AddCategory.State = {
	page: 0,
	loading: {
		saveImage: AsyncStateFactory(),
		saveData: AsyncStateFactory(),
	},
	firstForm: {
		categoryName: "",
		categoryCode: "",
		description: "",
		unit: "",
	},
	images: [],
	secondForm: {
		credit: [],
		negotiation: 0,
	},
	thirdForm: {
		descriptionLabels: [],
	},
};
