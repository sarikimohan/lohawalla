import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import fetchCatNoItems from "../fetch/services/fetchCatNoItems";

export default class ServerActions extends ServerStateUtils<StateWithLoading<CategoryNumberOfItems.State>> {
	async fetch(id: string) {
		const res = await this.handleAsync('fetch', () => fetchCatNoItems(id));
		if(res) {
			this.mutateState(p => {
				p.grid = res.data;
			})
		}
	}
}
