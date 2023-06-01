import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import getPrevData from "../../fetch/services/getPrevData";
import ValueChange from "@src/modules/ValueChange/ValueChangeImpl";
import { nanoid } from "nanoid";

export default class EditCompanyActions extends ServerStateUtils<
	StateWithLoading<EditCompany.State>
> {
	async fetch(id: string) {
		const res = await this.handleAsync("fetch", () => getPrevData(id));

		if (res) {
			const { data } = res;

			if (data) {
				this.mutateState((p) => {
					p.companyName = new ValueChange(data.companyName);
					p.description = data.description;
					p.images = data.images.map((v) => ({ link: v, deleted: false }));
					p.priceStructure = data.priceStructure.map((v, i) => ({
						_id: v._id,
						name: v.name,
						value: v.value ? v.value.toString() : "",
						isFixed: v.isFixed,
						type: v.type,
						operation: v.operation,
					}));
					p.descriptionLabels = data.descriptionLabels.map((v, i) => ({
						id: nanoid(),
						key: v.key,
						value: v.value,
					}));
				});
			}
		}
	}

	async save() {}
}
