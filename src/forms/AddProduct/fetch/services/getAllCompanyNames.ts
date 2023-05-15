import AddProductInstance from "../instance";
import apiIndex from "../apis";

export default async function getAllCompanyNames() {
	return await AddProductInstance.get<AddProduct.Entity[]>(
		apiIndex.getAllCompanyNames
	);
}
