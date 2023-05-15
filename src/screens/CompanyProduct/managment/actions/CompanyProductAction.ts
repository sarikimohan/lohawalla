import { getProductGridData } from "@src/globals/constants/async";
import StateUtils, { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";
import fetchCompanyProductListingData from "../../fetch/service/fetchCompanyProductGrid";

export default class CompanyProductsAction
	extends ServerStateUtils<CompanyProducts.State>
	implements CompanyProducts.Actions
{
	setQuery(query: string): void {
		this.mutateState((p) => (p.filter.query = query));
	}
	async fetchProducts(id: string){
		const res = await this.handleAsync("fetch",()=>fetchCompanyProductListingData(id))

		if(res){
			this.mutateState(p=>{
				p.products = res.data
			})
		}
	}
	getFilteredList(): CompanyProducts.CompanyProduct[] {
		return this.state.products.filter((v) => {
			const query = this.state.filter.query.toLowerCase().trim();
			const name = v.companyProductName.toLowerCase();
			return isPrefix(name, query);
		});
	}
}
