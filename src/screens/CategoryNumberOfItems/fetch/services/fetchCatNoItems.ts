import apiIndex from "../apis";
import CatNoItemsInstance from "../instance";

interface GridData {
	_id: string;
	srNo: number;
	itemName: {
		name: string;
		images: string;
	};
	price: number;
	numberOfCompanies: number;
	activeCompany: {
		name: string;
		id: string;
	};
	inactiveCompany: string[]; // delete the active company name from it
}

export default async function fetchCatNoItems(id: string) {
	return await CatNoItemsInstance.get<GridData[]>(
		apiIndex.getAllCategoryNumberOfItems(id)
	);
}
