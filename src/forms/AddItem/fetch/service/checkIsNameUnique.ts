import { apis } from "../apis";
import AddItemInstance from "../instance";

export default async function checkIsNameUnique(name: string) {
  return await AddItemInstance.get<boolean>(apis.checkIsNameUnique(name));
}