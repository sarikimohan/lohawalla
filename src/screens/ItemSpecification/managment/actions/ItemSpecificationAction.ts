import {
	getCompanyProductGridData,
	getItemData,
} from "@src/globals/constants/async";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";

export default class ItemSpecificationAction
	extends StateUtils<ItemSpecification.State>
	implements ItemSpecification.Actions
{
	setQuery(query: string): void {
		this.mutateState((p) => {
			p.filter.query = query.toLowerCase().trim();
		});
	}
	getFilteredList(): ItemSpecification.CompanyProduct[] {
		return this.state.companyProductList.filter((v) => {
			return isPrefix(v.companyProductName, this.state.filter.query);
		});
	}
	fetch(id: string): void {
		(async () => {
			try {
				this.mutateState((p) => {
					p.loading.fetch.status = "initialized";
				});

				const itemSpec = await getItemData({ id });
				const prodList = await getCompanyProductGridData({ id });

				this.mutateState((p) => {
					p.categoryName = itemSpec.categoryName;
					p.description = itemSpec.description;
					p.descriptionLabels = itemSpec.descriptionLables;
					p.itemName = itemSpec.itemName;
					p.margin = itemSpec.margin;

					p.companyProductList = prodList;

					p.loading.fetch.status = "success";
				});
			} catch (err) {
				this.mutateState((p) => {
					p.loading.fetch = { status: "failed", message: "some error occured" };
				});
			}
		})();
	}
}
