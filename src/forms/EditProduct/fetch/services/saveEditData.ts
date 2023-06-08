import apiIndex from "../apis";
import EditProductInstance from "../instance";

export interface EditCompanyProductData {
	id: string;
	description: string;
	descriptionLabels: {
		key: string;
		value: string;
		position: number;
	}[];
	images: string[];
	deletedImages: string[];
	priceField: {
		id: string;
		value: number;
	}[];
	by: NameIdPair;
	gst: { type: PercNum; value: number };
}

export default async function saveEditData(data: EditCompanyProductData) {
	return EditProductInstance.post(apiIndex.editCompanyProduct, data);
}
