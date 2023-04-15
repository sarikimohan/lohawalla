import {
	getCategorySpecification,
	getItemGridData,
} from "@src/globals/constants/async";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class CategorySpecificationAction
	extends StateUtils<CategorySpecification.State>
	implements CategorySpecification.Actions
{

	getItemListLen() {
		return this.state.itemList.length;
	}

	fetchData(id: string): void {
		(async () => {
			try {
				this.mutateState((p) => {
					p.loading.fetchData.status = "initialized";
				});
				const specData = await getCategorySpecification({ id });
				const itemData = await getItemGridData({ id });


				this.mutateState(p => {
					p.categoryName = specData.categoryName;
					p.credits = specData.creditDetails;
					p.description = specData.description;
					p.descriptionLabels = specData.descriptionLabels;
					p.negotiation = specData.negotiationDetails;
					p.images = specData.images;
					
					p.itemList = itemData;
				})

				this.mutateState((p) => (p.loading.fetchData.status = "success"));
			} catch (err) {
				this.mutateState((p) => (p.loading.fetchData.status = "failed"));
			}
		})();
	}
	filterList(): CategorySpecification.ItemGridData[] {
		throw new Error("Method not implemented.");
	}
	setQuery(query: string): void {
		throw new Error("Method not implemented.");
	}
	toggleFilter(id: string): void {
		throw new Error("Method not implemented.");
	}
}
