import { getProductSpecification } from "@src/globals/constants/async";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class ProdSpecActions
	extends StateUtils<ProductSpecification.State>
	implements ProductSpecification.Actions
{
	fetch(id: string) {
		this.mutateState((p) => (p.loading.fetch.status = "initialized"));
		try {
			(async () => {
				const specData = await getProductSpecification({ id });
				this.mutateState((p) => {
					p.companyName = specData.companyName;
					p.description = specData.description;
					p.descriptionLabels = specData.descriptionLabels;
					p.gst = specData.gstDetails;
					p.images = specData.images;
					p.margin = specData.marginStructure;
					p.priceStructure = specData.priceStructure;
					p.productName = specData.productName;

					p.loading.fetch.status = "success";
				});
			})();
		} catch (err) {
			this.mutateState(
				(p) =>
					(p.loading.fetch = {
						status: "failed",
						message: "some error occured",
					})
			);
		}
	}
}
