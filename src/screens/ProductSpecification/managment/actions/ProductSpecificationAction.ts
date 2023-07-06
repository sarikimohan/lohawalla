import { getProductSpecification } from "@src/globals/constants/async";
import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import fetchProductSpecification from "../../fetch/services/fetchProducSpecification";
import deleteProduct from "../../fetch/services/deleteProduct";

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

	async deleteCompanyProduct(id: string, onSuccess: () => void) {
		this.handleAsync("deleteCompanyProduct", () => deleteProduct(id));
		onSuccess();
	}
}
