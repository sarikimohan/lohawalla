import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
// import server from "@src/modules/axios/instances";
import { NameIdPair } from "@src/modules/backendTypes/change/NameIdPair";
import { apis } from "../../fetch/api";
import AddCompanyInstance from "../../fetch/instance";
import SaveImage from "@src/modules/ImageServerUtils/services/SaveImage";

interface DescriptionData {
	key: string;
	value: string;
	position: number;
}

interface PriceField {
	name: string;
	value: number | null;
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
	async saveForm(by: NameIdPair, onSuccess?: () => void) {
		//* created the data object
		const d: FormFields = {
			name: this.state.firstForm.companyName.value.trim(),
			description: this.state.firstForm.description.value.trim(),
			images: [],
			by,
			descriptionLabels: this.state.descriptionLabels.map((v, i) => ({
				key: v.key.trim(),
				value: v.value.value.trim(),
				position: i,
			})),
			pricefields: this.state.priceStructure.map((v, i) => ({
				name: v.name.trim(),
				value: v.value.value === "" ? null : parseFloat(v.value.value),
				meta: {
					operation: v.operation,
					type: v.type,
					position: i,
					isFixed: v.fixed,
				},
			})),
		};

		const res = await this.handleAsync(
			"saveImages",
			() => SaveImage(this.state.images),
			{
				initializedMessage: "saving images...",
				successMessage: "images saved, proceeding to save data",
				errMessage: "failed to save images, proceeding to save data",
			}
		);

		if (res) {
			d.images = res.data;
		}

		await this.handleAsync(
			"save",
			() => {
				return AddCompanyInstance.post(apis.createCompany, d);
			},
			{
				errMessage: "failed to save company!",
				onSuccess,
				initializedMessage: "saving data ...",
				successMessage: "successfully saved data",
			}
		);
	}
}
