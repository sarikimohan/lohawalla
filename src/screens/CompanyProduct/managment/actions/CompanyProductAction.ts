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
		this.mutateState((p) => (p.loading.fetch.status = "initialized"));

		(async () => {
			try {
				const data = await getProductGridData({ id });

				this.mutateState((p) => {
					data.forEach((v) => {
						const newInp: CompanyProducts.CompanyProduct = {
							_id: v._id,
							srNo: v.srNo,
							companyName: v.company,
							companyProductName: v.companyProductName,
						};
						p.products.push(newInp);
					});
				});

				this.mutateState((p) => (p.loading.fetch.status = "success"));
			} catch (err) {
				this.mutateState((p) => {
					p.loading.fetch = {
						status: "failed",
						message: "some error occured",
					};
				});
			}
		})();
	}
	getFilteredList(): CompanyProducts.CompanyProduct[] {
		return this.state.products.filter((v) => {
			const query = this.state.filter.query.toLowerCase().trim();
			const name = v.companyProductName.toLowerCase();
			return isPrefix(name, query);
		});
	}
}
