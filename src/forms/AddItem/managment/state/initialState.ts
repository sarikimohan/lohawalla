import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: AddItem.State = {
	page: 0,
	itemName: { value: "" },
	itemHSNCode: { value: "" },
	itemCode: { value: "" },
	images: [],
	margin: {
		online: { value: "" },
		cash: { value: "" },
	},
	description: { value: "" },
	descriptionLabels: [],
	loading: {
		imageUpload: AsyncStateFactory(),
		saveData: AsyncStateFactory(),
	},
	descriptionEntry: {
		key: { value: "" },
		value: { value: "" },
	},
};
