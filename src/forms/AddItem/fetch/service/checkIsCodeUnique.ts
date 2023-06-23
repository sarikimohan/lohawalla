import { apis } from "../apis";
import AddItemInstance from "../instance";

export default async function checkIsCodeUnique(cid: string, code: string) {
  return await AddItemInstance.get<boolean>(apis.checkIsCodeUnique(cid, code));
}