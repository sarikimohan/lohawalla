import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: CategorySpecification.State = {
	categoryName: "",
	description: "",
	descriptionLabels: [],
	credits: [],
	negotiation: 0,
	itemList: [],
	filter: {
		query: "",
		filters: [],
	},
	loading: {
		fetchData: AsyncStateFactory(),
	},
};
