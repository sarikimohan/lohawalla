import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: ProductSpecification.State = {
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
};
