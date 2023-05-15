import { getCompanyGridData } from "@src/globals/constants/async";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";

export default class CompanyActions
	extends StateUtils<Companies.State>
	implements Companies.Actions
{
	CompanyListRow(): void {
		
	}

	filterCompanylistRow(): Companies.CompanyListRow[] {
		return this.state.companyList.filter((v) => {
			const query = this.state.filter.query.toLowerCase().trim();
			return isPrefix(v.companyName.name.toLowerCase(), query);
		});
	}
	setQuery(query: string) {
		this.mutateState((p) => {
			p.filter.query = query;
		});
	}
}
