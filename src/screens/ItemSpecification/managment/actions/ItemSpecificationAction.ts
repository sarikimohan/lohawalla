import {
	getCompanyProductGridData,
	getItemData,
} from "@src/globals/constants/async";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";
import getItemSpec from "../../fetch/service/getItemSpec";

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
				
				const itemSpec = await getItemSpec(id);
				this.mutateState((p) => {
					const data = itemSpec.data;
					p.itemName = data.itemName;
					p.categoryName = data.categoryName;
					p.description = data.description;
					p.descriptionLabels = data.descriptionLabels;
					p.margin = data.margin;
					p.images = data.images;

					console.log(p);

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
