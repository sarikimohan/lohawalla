import {
	getCompanyProductGridData,
	getItemData,
} from "@src/globals/constants/async";
import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";
import getItemSpec from "../../fetch/service/getItemSpec";
import getItemGridData from "../../fetch/service/getItemGridData";

export default class ItemSpecificationAction
	extends ServerStateUtils<ItemSpecification.State>
	implements ItemSpecification.Actions
{
	setQuery(query: string): void {
		this.mutateState((p) => {
			p.filter.query = query.toLowerCase().trim();
		});
	}
	getFilteredList(): ItemSpecification.CompanyProduct[] {
		return this.state.companyProductList.filter((v) => {
			return isPrefix(v.productName, this.state.filter.query);
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
					console.log(p.images);
					p.loading.fetch.status = "success";
				});
			} catch (err) {
				this.mutateState((p) => {
					p.loading.fetch = { status: "failed", message: "some error occured" };
				});
			}
		})();
	}
	async fetchGrid(id: string) {
		const res = await this.handleAsync("fetchGrid", () => getItemGridData(id));
		if (res) {
			this.mutateState((p) => {
				p.companyProductList = res.data;
			});
		}
	}
	setshowForm(show: boolean) {
		this.mutateState((p) => {
			p.showForm = show;
		});
	}
}
