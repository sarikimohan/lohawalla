import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
// import server from "@src/modules/axios/instances";
import { apiIndex } from "../../fetch/apis";
import AddCategoryInstance from "../../fetch/instance";

export default class SaveCategoryActions extends ServerStateUtils<AddCategory.State> {
	async save(images: string[], by: NameIdPair) {
		const state = this.state;
		const firstForm = state.firstForm;
		const credits = state.credit;

		const d: AddCategoryAsync.FormData = {
			name: firstForm.categoryName.value,
			code: firstForm.categoryCode.value,
			unit: {
				unitsId: "",
				weight: -1,
			},
			description: firstForm.description.value,
			credit: credits.map((v, i) => ({
				days: v.days,
				type: v.type,
				value: parseFloat(v.value.value),
			})),
			negotiation: parseFloat(state.negotiation.value),
			descriptionLabels: state.descriptionLabels.map((v, i) => ({
				key: v.key,
				value: v.value.value,
				position: i,
			})),
			by,
			images,
		};

		if (this.state.firstForm.unit) {
			const selectedUnit = this.state.firstForm.unit;
			const unit = {
				unitsId: "",
				weight: -1,
			};
			unit.unitsId = selectedUnit.id;
			unit.weight =
				selectedUnit.weight === -1
					? parseFloat(this.state.firstForm.unitWeightInputField.value)
					: selectedUnit.weight;
			d.unit = unit;
		} else {
			d.unit = undefined;
		}

		const res = await this.handleAsync(
			"save",
			() => {
				return AddCategoryInstance.post<string>(apiIndex.createCategory, d);
			},
			{
				errMessage:
					"failed to save category, check the internet connection or try again",
			}
		);
	}
}
