import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import { nanoid } from "nanoid";

export const InitialState: AddCompany.State = {
	page: 0,
	firstForm: { companyName: { value: "" }, description: { value: "" } },
	images: null,
	priceStructure: [
		{
			id: nanoid(),
			name: "basic rate",
			type: "numeric",
			operation: "add",
			value: {
				value: "",
			},
			fixed: true,
		},
	],
	tempPriceStructure: [
		{
			id: nanoid(),
			name: { value: "" },
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
