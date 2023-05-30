import { apiIndex } from "../apis";
import EditItemInstance from "../instances";

export default async function checkCodeIsUnique(code: string) {
	return EditItemInstance.get<boolean>(apiIndex.checkCodeIsUnique(code));
}
