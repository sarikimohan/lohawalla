import { apiIndex } from "../apis";
import AddCategoryInstance from "../instance";

export default async function checkIsCodeUnique(code: string) {
	return await AddCategoryInstance.get(apiIndex.isCodeUnique(code));
}
