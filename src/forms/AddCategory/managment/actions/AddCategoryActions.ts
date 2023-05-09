import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class AddCategoryActions
	extends StateUtils<AddCategory.State>
	implements AddCategory.Actions
{
	navFront() {
		this.mutateState((p) => {
			if (p.page < 2) p.page += 1;
		});
	}
	navBack() {
		this.mutateState((p) => {
			if (p.page > 0) p.page -= 1;
		});
	}
	submit() {
		
	}
}
