import {
	getCategorySpecItemGridData,
	getCategorySpecification,
	getItemGridData,
} from "@src/globals/constants/async";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";

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
				this.mutateState(p => p.loading.fetchData.status = 'initialized');

			} catch(err) {}


		})();

		(async () => {
			try {
				this.mutateState((p) => {
					p.loading.fetchData.status = "initialized";
				});
				const specData = await getCategorySpecification({ id });
				const itemData = await getCategorySpecItemGridData(id);


				this.mutateState(p => {
					p.categoryName = specData.categoryName;
					p.credits = specData.creditDetails;
					p.description = specData.description;
					p.descriptionLabels = specData.descriptionLabels;
					p.negotiation = specData.negotiationDetails;
					p.images = specData.images;
					
					p.itemList = itemData;
					console.log(itemData);
				})

				this.mutateState((p) => (p.loading.fetchData.status = "success"));
			} catch (err) {
				this.mutateState((p) => (p.loading.fetchData.status = "failed"));
			}
		})();
	}

	filterList(): CategorySpecification.ItemGridData[] {
		console.log('value of item list', this.state.itemList);
		return this.state.itemList.filter((v)=>{
			for(let filter of this.state.filter.filters){
				if(filter.isActive){
					const query = this.state.filter.query
					if(filter.name === "item name"){
						if(isPrefix(v.itemName.name.toLowerCase(), query)) return true;
					}
					if(filter.name === "item code"){
						if(isPrefix(v.itemCode.toString(), query)) return true;
					}
				}
			}
			return false;
		})
	}
	setQuery(query: string): void {
		this.mutateState((p)=>{
			p.filter.query = query
		})
	}
	toggleFilter(id: string) {
		this.mutateState((p) => {
			for (let filter of p.filter.filters) {
				if (filter.id === id) {
					filter.isActive = !filter.isActive;
				}
			}
		});
	}
}
