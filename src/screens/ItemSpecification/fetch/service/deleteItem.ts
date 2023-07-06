import { DeleteInstance } from "@src/globals/fetch/instances";
import apiIndex from "../apis";

export default async function deleteItem(id: string) {
  return DeleteInstance.post(apiIndex.deleteItem(id));
}