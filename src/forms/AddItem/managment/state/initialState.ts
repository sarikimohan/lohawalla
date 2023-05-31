import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState = {
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
		save: AsyncStateFactory(),
		checkName: AsyncStateFactory(),
		checkCode: AsyncStateFactory(),
	},
	descriptionEntry: {
		key: { value: "" },
		value: { value: "" },
	},
};
