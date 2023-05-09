import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: AddCategory.State = {
	page: 1,
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
		credit: [{ days: 3, value: 20 }],
		negotiation: 0,
	},
	thirdForm: {
		descriptionLabels: [],
	},
};
