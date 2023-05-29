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
	unitList: {
		_id: string;
		name: string;
		weight: number;
	}[];
	unit: {
		_id: string;
		name: string;
		weight: number|null;
		value: string|null;
	} | null;
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
