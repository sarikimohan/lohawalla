import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import SetActiveCompany from "../SetActiveCompany";
import isPrefix from "@src/modules/Utils/isPrefix";
import fetchActiveCompany from "../fetch/service/fetchActiveCompany";

export default class SetActions extends ServerStateUtils<SetActiveCompany.State> {
	search() {
		if (this.state.query === "") return this.state.inActiveCompanies;
		else {
			return this.state.inActiveCompanies.filter((v) => {
				return isPrefix(v.name.toLowerCase(), this.state.query.toLowerCase());
			});
		}
	}

	setActive(data: SetActiveCompany.Entity) {
		this.mutateState((p) => {
			p.inActiveCompanies = p.inActiveCompanies.filter(
				(v) => v.id !== data.id
			);
			if (p.activeCompany) p.inActiveCompanies.push(p.activeCompany);
			p.activeCompany = data;
		});
	}

}
