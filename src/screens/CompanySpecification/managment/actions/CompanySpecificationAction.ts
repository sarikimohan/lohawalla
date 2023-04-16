import {
	getCompanySpecificationData,
	getProductGridData,
} from "@src/globals/constants/async";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";

export default class CompanySpecActions
	extends StateUtils<CompanySpecification.State>
	implements CompanySpecification.Actions
{
	fetch(id: string): void {
		this.mutateState((p) => {
			p.loading.fetch.status = "initialized";
		});
		(async () => {
			try {
				const companyProdList = await getProductGridData({ id });
				const companySpec = await getCompanySpecificationData({ id });

				this.mutateState((p) => {
					p.companyName = companySpec.companyName;
					p.description = companySpec.description;
					p.descriptionLabels = companySpec.descriptionLabels;
					p.priceStructure = companySpec.priceStructure;
					p.companyList = companyProdList;
					p.images = companySpec.images;

					p.loading.fetch.status = "success";
				});
			} catch (err) {
				this.mutateState(
					(p) =>
						(p.loading.fetch = {
							status: "failed",
							message: "some error occured",
						})
				);
			}
		})();
	}
	filter(): CompanySpecification.CompanyProduct[] {
		const query = this.state.filter.query.toLowerCase().trim();
		if (query === "") return this.state.companyList;
		return this.state.companyList.filter((v) => {
			isPrefix(v.companyProductName.toLowerCase(), query);
		});
	}
	setQuery(query: string): void {
		this.mutateState((p) => {
			p.filter.query = query;
		});
	}
}
