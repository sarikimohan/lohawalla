import apiIndex from "../apis";
import AddProductInstance from "../instance";

export default async function getAllItemNamesOfCategory(id: string) {
	return await AddProductInstance.get<AddProduct.Entity[]>(
		apiIndex.getAllItemsOfCategory(id)
	);
}
