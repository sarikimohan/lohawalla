import { apis } from "../apis";
import AddItemInstance from "../instance";

export default async function checkIsCodeUnique(code: string) {
  return await AddItemInstance.get<boolean>(apis.checkIsCodeUnique(code));
}