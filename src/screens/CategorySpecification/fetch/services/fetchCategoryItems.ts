import apiIndex from "../apis";
import CategorySpecificationInstance from "../instance";

export default async function fetchCategoryItems(id: string) {
	return await CategorySpecificationInstance.get<
		CategorySpecAsync.CategorySpecificationGrid[]
	>(apiIndex.getItemList(id));
}
