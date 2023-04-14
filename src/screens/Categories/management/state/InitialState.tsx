import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: Categories.State = {
	categoryList: [],
	filter: {
		query: "",
		filters: [
			{ id: "cname", name: "category name", isActive: true },
			{ id: "ccode", name: "category code", isActive: true },
		],
	},
	loading: {
		fetchCategoryList: AsyncStateFactory(),
	},
};
