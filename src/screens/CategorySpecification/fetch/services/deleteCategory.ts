import { DeleteInstance } from "@src/globals/fetch/instances";
import apiIndex from "../apis";

export default async function deleteCategory(id: string) {
  DeleteInstance.post(apiIndex.deleteCategory(id)); 
}