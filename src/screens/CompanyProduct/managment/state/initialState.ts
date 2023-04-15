import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: CompanyProducts.State = {
	products: [],
	filter: {
		query: "",
		filters: [],
	},
	loading: {
		fetch: AsyncStateFactory(),
	},
};
