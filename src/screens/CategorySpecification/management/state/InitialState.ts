import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState = {
	categorySpec: {
		_id: "",
		name: "",
		description: "",
		descriptionLabels: [],
		credit: [],
		negotiation: 0,
		images: [],
	},
	itemList: [],
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
		fetchItemData: AsyncStateFactory(),
		fetchSpecData: AsyncStateFactory()
	},
	showForm: false,
	refresh: false,
};
