import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import fetchUnits from "../fetch/services/fetchUnits";

export default class UnitActions
	extends ServerStateUtils<Unit.State>
	implements Unit.Actions
{
	// TODO
	saveChanges() {}
	async fetchData() {
		const res = await this.handleAsync("fetch", () => fetchUnits());
		if (res) {
			this.mutateState((p) => {
				p.unitList = res.data;
			});
		}
	}

	toggleFormVisibility() {
		this.mutateState((p) => {
			p.showAddUnitForm = !p.showAddUnitForm;
		});
	}
	setQuery(d: string) {
		this.mutateState((p) => {
			p.query = d;
		});
	}
}
