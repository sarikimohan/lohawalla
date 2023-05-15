import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: ItemSpecification.State = {
	itemName: "",
	categoryName: "",
	description: "",
	descriptionLabels: [],
	margin: {
		online: 0,
		cash: 0,
	},
	companyProductList: [],
	filter: {
		filters: [],
		query: "",
	},
	images: [],
	loading: {
		fetch: AsyncStateFactory(),
	},
};
