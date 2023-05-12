import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
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
	meta: {
		operation: OpType;
		type: PercNum;
		position: number;
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

export default class SaveFormActions extends StateUtils<AddCompany.State> {
	async saveForm(images: string[], by: NameIdPair) {
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
				meta: {
					operation: v.operation,
					type: v.type,
					position: i,
				},
			})),
		};

		this.mutateState((p) => {
			p.loading.savedData.status = "initialized";
		});
		try {
			await server.post(apis.createCompany, d);
			this.mutateState((p) => {
				p.loading.savedData.status = "success";
			});
		} catch (err) {
			this.mutateState((p) => {
				p.loading.savedData.status = "failed";
			});
		}
	}
}
