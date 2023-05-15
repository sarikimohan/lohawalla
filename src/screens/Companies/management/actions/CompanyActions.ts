import { getCompanyGridData } from "@src/globals/constants/async";
import StateUtils, { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";
import fetchCompanyData from "../../fetch/service/fetchCompanyData";

export default class CompanyActions
	extends ServerStateUtils<Companies.State>
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

	async fetchCompanyGridData(){
		const res = await this.handleAsync("get",()=>fetchCompanyData());
		if(res){
			this.mutateState(p=>{
				p.companyList = res.data
			})
		}
	}
	setQuery(query: string) {
		this.mutateState((p) => {
			p.filter.query = query;
		});
	}
}
