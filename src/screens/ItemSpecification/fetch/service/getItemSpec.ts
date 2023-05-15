import apiIndex from "../apis";
import ItemSpecInstance from "../instance";

export default async function getItemSpec(id: string) {
  return await ItemSpecInstance.get<ItemSpecAsync.ItemSpecificationData>(apiIndex.getItemSpec(id));
}