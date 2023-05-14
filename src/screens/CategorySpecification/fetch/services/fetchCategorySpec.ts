import apiIndex from "../apis";
import CategorySpecificationInstance from "../instance";

interface Credit {
	days: number;
	value: number;
}

interface CategorySpecificationData {
	_id: string;
	name: string;
	description: string;
	descriptionLabels: {
		key: string;
		value: string;
		position: number;
	}[];
	credit: Credit[];
	negotiation: number;
	images: string[];
}

export default async function fetchCategorySpec(id: string) {
	return await CategorySpecificationInstance.get<CategorySpecificationData>(
		apiIndex.getCategoryData(id)
	);
}
