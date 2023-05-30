import { apiIndex } from "../apis";
import EditItemInstance from "../instances";

export default async function checkNameIsUnique(name: string) {
	return EditItemInstance.get<boolean>(apiIndex.checkNameIsUnique(name));
}
