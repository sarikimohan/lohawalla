import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class CategorySpecificationAction
	extends StateUtils<CategorySpecification.State>
	implements CategorySpecification.Actions
{
	fetchData(): void {
		throw new Error("Method not implemented.");
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
