import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: CategorySpecification.State = {
	categoryName: "",
	description: "",
	descriptionLabels: [],
	credits: [],
	negotiation: 0,
	itemList: [],
	images: [],
	filter: {
		query: "",
		filters: [
			{
				id: "1",
				name: "item name",
				isActive: true,
			},
			{
				id: "2",
				name: "item code",
				isActive: true,
			},
		],
	},
	loading: {
		fetchData: AsyncStateFactory(),
	},
};
