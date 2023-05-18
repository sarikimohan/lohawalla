import apiIndex from "../apis";
import AddProductInstance from "../instance";

export default async function getCategoryUnit(categoryId: string) {
	return await AddProductInstance.get<{ unitsId: string; weight: number }>(
		apiIndex.getCategoryUnit(categoryId)
	);
}
