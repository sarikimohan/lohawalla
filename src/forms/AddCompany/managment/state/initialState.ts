import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: AddCompany.State = {
	page: 0,
	firstForm: { companyName: "", description: "" },
	images: null,
	priceStructure: [],
	tempPriceStructure: [
		{
			name: "",
			type: "numeric",
			operation: "add",
		},
	],
	descriptionLabels: [],
	loading: {
		savedImages: AsyncStateFactory(),
		savedData: AsyncStateFactory(),
	},
};
