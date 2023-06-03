import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState = {
	productName: "",
	companyName: "",
	itemName: "",
	description: "",
	descriptionLabels: [],
	priceStructure: [],
	margin: { online: 0, cash: 0 },
	gst: { key: '', value: "" },
	images: [],
	loading: {
		fetch: AsyncStateFactory(),
	},
	category: {
		name: "",
		_id: ""
	}
};
