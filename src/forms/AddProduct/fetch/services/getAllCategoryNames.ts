import apiIndex from "../apis";
import AddProductInstance from "../instance";

export default async function getAllCategoryNames() {
	return await AddProductInstance.get<AddProduct.Entity[]>(
		apiIndex.getAllCategoryNames
	);
}
