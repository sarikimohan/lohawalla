import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
// import server from "@src/modules/axios/instances";
import { apiIndex } from "../../fetch/apis";
import AddCategoryInstance from "../../fetch/instance";
import SaveImage from "@src/modules/SaveImage/SaveImage";

export default class SaveCategoryActions extends ServerStateUtils<AddCategory.State> {
	async save(by: NameIdPair) {
		const state = this.state;
		const firstForm = state.firstForm;
		const credits = state.credit;

		const d: AddCategoryAsync.FormData = {
			name: firstForm.categoryName.value.trim(),
			code: firstForm.categoryCode.value.trim(),
			description: firstForm.description.value.trim(),
			credit: credits.map((v, i) => ({
				days: v.days,
				type: v.type,
				value: parseFloat(v.value.value.trim()),
			})),
			negotiation: parseFloat(state.negotiation.value.trim()),
			descriptionLabels: state.descriptionLabels.map((v, i) => ({
				key: v.key,
				value: v.value.value,
				position: i,
			})),
			by,
			images: [],
		};

		await this.handleAsync("saveImages", () => SaveImage(this.state.images), {
			initializedMessage: "saving images...",
			errMessage: "cannot save images, proceeding to save data...",
		});

		await this.handleAsync(
			"save",
			() => {
				return AddCategoryInstance.post<string>(apiIndex.createCategory, d);
			},
			{
				initializedMessage: "saving data",
				errMessage:
					"failed to save category, check the internet connection or try again",
			}
		);
	}
}
