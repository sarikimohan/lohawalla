import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import fetchUnits from "../fetch/services/fetchUnits";
import isPrefix from "@src/modules/Utils/isPrefix";

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

	filter() {
		const query = this.state.query.trim();
		const data = this.state.unitList;

		if (query.length === 0) return data;

		return data.filter((v) => isPrefix(v.name, query));
	}
}
