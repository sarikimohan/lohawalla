import { getProductSpecification } from "@src/globals/constants/async";
import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import fetchProductSpecification from "../../fetch/services/fetchProducSpecification";

export default class ProdSpecActions
	extends ServerStateUtils<ProductSpecification.State>
	implements ProductSpecification.Actions
{
	async fetch(id: string) {
		const res = await this.handleAsync("fetch", () =>
			fetchProductSpecification(id)
		);
		if (res) {
			this.setState((p) => ({ ...p, ...res.data }));
		}
	}
}
