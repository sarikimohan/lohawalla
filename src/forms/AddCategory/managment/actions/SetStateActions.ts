import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class SetStateActions
	extends StateUtils<AddCategory.State>
	implements AddCategory.StateSettingActions
{
	setFirstForm(data: AddCategory.FirstFormState) {
		this.mutateState((p) => {
			p.firstForm = data;
		});
	}
	setSecondForm(data: AddCategory.SecondFormState) {
		this.mutateState((p) => {
			p.secondForm = data;
		});
	}
	setThridForm(data: AddCategory.ThirdFormState) {
		this.mutateState((p) => {
			p.thirdForm = data;
		});
	}
}
