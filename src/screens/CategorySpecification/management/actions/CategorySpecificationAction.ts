import { getCategorySpecification } from "@src/globals/constants/async";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";

export default class CategorySpecificationAction
	extends StateUtils<CategorySpecification.State>
	implements CategorySpecification.Actions
{
	fetchData(id: string): void {

	}

	filterList(): CategorySpecification.ItemGridData[] {
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
