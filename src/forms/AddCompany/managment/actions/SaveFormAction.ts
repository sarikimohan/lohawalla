import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import server from "@src/modules/axios/instances";
import { NameIdPair } from "@src/modules/backendTypes/change/NameIdPair";
import { apis } from "../../fetch/api";

interface DescriptionData {
	key: string;
	value: string;
	position: number;
}

interface PriceField {
	name: string;
	value: number;
	meta: {
		operation: OpType;
		type: PercNum;
		position: number;
		isFixed: boolean;
	};
}

interface FormFields {
	name: string;
	description: string;
	images: string[];
	by: NameIdPair;
	descriptionLabels: DescriptionData[];
	pricefields: PriceField[];
}

export default class SaveFormActions extends ServerStateUtils<AddCompany.State> {
	async saveForm(images: string[], by: NameIdPair, onSuccess: () => void) {
		//* created the data object
		const d: FormFields = {
			name: this.state.firstForm.companyName.value,
			description: this.state.firstForm.description.value,
			images,
			by,
			descriptionLabels: this.state.descriptionLabels.map((v, i) => ({
				key: v.key,
				value: v.value.value,
				position: i,
			})),
			pricefields: this.state.priceStructure.map((v, i) => ({
				name: v.name,
				value: parseFloat(v.value.value),
				meta: {
					operation: v.operation,
					type: v.type,
					position: i,
					isFixed: v.fixed,
				},
			})),
		};

		this.handleAsync(
			"save",
			() => {
				return server.post(apis.createCompany, d);
			},
			{
				errMessage: "failed to save company!",
			}
		);
	}
}
