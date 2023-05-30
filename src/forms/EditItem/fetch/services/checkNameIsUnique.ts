import { apiIndex } from "../apis";
import EditItemInstance from "../instances";

export default async function checkNameIsUnique(
	name: string,
	hasChanged: boolean
) {
	if (!hasChanged) return;
	const res = await EditItemInstance.get<boolean>(
		apiIndex.checkNameIsUnique(name)
	);
	if (!res.data) return name + " already exists";
}
