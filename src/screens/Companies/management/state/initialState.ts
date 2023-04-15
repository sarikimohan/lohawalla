import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: Companies.State = {
	companyList: [],
	filter: {
		query: "",
		filters: [],
	},
	loading: {
		fetchCompanyList: AsyncStateFactory(),
	},
};
