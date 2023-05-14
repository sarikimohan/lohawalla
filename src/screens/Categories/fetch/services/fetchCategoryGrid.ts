import { apiIndex } from "../ApiIndex";
import CategoriesInstance from "../instance";

export interface CategoryGridData {
	_id: string;
	srNo: number;
	categoryName: {
		name: string;
		imageURL: string | null;
	};
	categoryCode: string;
	entryTime: string;
	noOfItems: number;
	rowStatus: {
		isFixed: boolean;
		position: number;
	};
}

export default function fetchCategoryGrid() {
	return CategoriesInstance.get<CategoryGridData[]>(apiIndex.getAllCategories);
}
