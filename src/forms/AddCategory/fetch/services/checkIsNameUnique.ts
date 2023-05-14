import { apiIndex } from "../apis";
import AddCategoryInstance from "../instance";

export default async function checkIsNameUnique(name: string) {
	return await AddCategoryInstance.get<boolean>(apiIndex.isNameUnique(name));
}
