import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import server from "@src/modules/axios/instances";
import { NameIdPair } from "@src/modules/backendTypes/change/NameIdPair";
import { S } from "@storybook/react/dist/types-0a347bb9";
import { apis } from "../../fetch/apis";

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
	descriptionLables: DescriptionData[];
}

export default class SubmitActions extends ServerStateUtils<AddItem.State> {
	async saveForm(
		images: string[],
		id: string,
		by: NameIdPair,
		onSuccessAction?: () => void
	) {
		const data: FormFields = {
			cid: id,
			name: this.state.itemName.value,
			HSNCode: parseInt(this.state.itemHSNCode.value),
			code: this.state.itemCode.value,
			margin: {
				online: parseInt(this.state.margin.online.value),
				cash: parseInt(this.state.margin.cash.value),
			},
			by: {
				name: by.name,
				id: by.id,
			},
			description: this.state.description.value,
			images: images,
			descriptionLables: this.state.descriptionLabels.map((v, i) => ({
				key: v.key,
				value: v.value.value,
				position: i,
			})),
		};

		await this.handleAsync("save", () => server.post(apis.createItem, data), {
			errMessage: "failed to save item!",
			onSuccess: onSuccessAction,
		});
	}
}
