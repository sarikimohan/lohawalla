import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: CompanySpecification.State = {
	companyName: "",
	description: "",
	descriptionLabels: [],
	priceStructure: [],
	companyList: [],
	filter: {
		query: "",
		filters: [],
	},
  images: [],
	loading: {
		fetch: AsyncStateFactory(),
	},
};
