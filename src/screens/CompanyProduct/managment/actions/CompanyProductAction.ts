import { getProductGridData } from "@src/globals/constants/async";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";

export default class CompanyProductsAction
	extends StateUtils<CompanyProducts.State>
	implements CompanyProducts.Actions
{
	setQuery(query: string): void {
		this.mutateState((p) => (p.filter.query = query));
	}
	fetchProducts(id: string): void {
		
	}
	getFilteredList(): CompanyProducts.CompanyProduct[] {
		return this.state.products.filter((v) => {
			const query = this.state.filter.query.toLowerCase().trim();
			const name = v.companyProductName.toLowerCase();
			return isPrefix(name, query);
		});
	}
}
