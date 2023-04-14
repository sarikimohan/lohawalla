import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: Categories.State = {
	categoryList: [],
	filter: {
		query: "",
		filters: [],
	},
	loading: {
		fetchCategoryList: AsyncStateFactory(),
	},
};
