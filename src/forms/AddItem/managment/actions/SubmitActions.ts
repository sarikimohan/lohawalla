import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
// import server from "@src/modules/axios/instances";
import { NameIdPair } from "@src/modules/backendTypes/change/NameIdPair";
import { S } from "@storybook/react/dist/types-0a347bb9";
import { apis } from "../../fetch/apis";
import AddItemInstance from "../../fetch/instance";
import SaveImage from "@src/modules/ImageServerUtils/services/SaveImage";
import ImageSmall from "@src/Components/common/ImageSmall/ImageSmall";
import getAllUnits from "../../fetch/service/getAllUnits";

interface DescriptionData {
	key: string;
	value: string;
	position: number;
}
interface FormFields {
	cid: string;
	name: string;
	HSNCode: number;
	code: string;
	margin: {
		online: number;
		cash: number;
	};
	by: NameIdPair;
	description: string;
	images: string[];
	unit: {
		id: string;
		weight: number | null;
	};
	descriptionLables: DescriptionData[];
}

export default class SubmitActions extends ServerStateUtils<AddItem.State> {
	async saveForm(id: string, by: NameIdPair, onSuccessAction?: () => void) {
		const data: FormFields = {
			unit: {
				id: "",
				weight: null,
			},
			cid: id,
			name: this.state.itemName.value.trim(),
			HSNCode: parseInt(this.state.itemHSNCode.value.trim()),
			code: this.state.itemCode.value.trim(),
			margin: {
				online: parseInt(this.state.margin.online.value.trim()),
				cash: parseInt(this.state.margin.cash.value.trim()),
			},
			by,
			description: this.state.description.value.trim(),
			images: [],
			descriptionLables: this.state.descriptionLabels.map((v, i) => ({
				key: v.key.trim(),
				value: v.value.value.trim(),
				position: i,
			})),
		};

		//* working on the units
		if (this.state.unit) {
			data.unit.id = this.state.unit.id;
			if (this.state.unit.weight) {
				data.unit.weight = null;
			} else {
				if (this.state.unit.value === null) {
					throw new Error("no value present");
				}
				data.unit.weight = parseFloat(this.state.unit.value);
			}
		} else {
			throw new Error("no unit present");
		}

		const images = this.state.images;

		const res = await this.handleAsync("saveImages", () => SaveImage(images), {
			initializedMessage: "saving images ...",
			errMessage: "cannot save images, proceeding to save data",
			successMessage: "successfully saved images, proceeding to save data",
		});

		if (res) {
			data.images = res.data;
		}

		await this.handleAsync(
			"save",
			() => AddItemInstance.post(apis.createItem, data),
			{
				errMessage: "failed to save item!",
				onSuccess: onSuccessAction,
				successMessage: "successfully saved item data",
			}
		);
	}

	async fetchAllUnits() {
		const res = await this.handleAsync("fetchUnits", () => getAllUnits());
		if (res) {
			this.mutateState((p) => {
				p.unitList = res.data;
			});
		}
	}
}
