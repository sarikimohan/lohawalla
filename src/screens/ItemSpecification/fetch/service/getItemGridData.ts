import apiIndex from "../apis";
import ItemSpecInstance from "../instance";

export default async function getItemGridData(id: string) {
	return await ItemSpecInstance.get<ItemSpecAsync.ItemProductGridData[]>(
		apiIndex.getItemGridData(id)
	);
}
