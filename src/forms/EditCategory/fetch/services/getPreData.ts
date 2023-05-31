import apiIndex from "../apis";
import EditCategoryInstance from "../instances";

export interface EditCategoryFormData {
	categoryName: string;
	categoryCode: string;
	description: string;
	images: string[];
	credit: {
		days: number;
		value: number;
		type: PercNum;
	}[];
	descriptionLabels: {
		key: string;
		value: string;
		position: number;
	}[];
	negotiation: number;
}

export default async function getPreData(id: string) {
	return await EditCategoryInstance.get<EditCategoryFormData>(
		apiIndex.getFormData(id)
	);
}
