import { apiIndex } from "../apis";
import EditItemInstance from "../instances";

export default async function checkNameIsUnique(
	cid: string,
	name: string,
	hasChanged: boolean
) {
	if (!hasChanged) return;
	const res = await EditItemInstance.get<boolean>(
		apiIndex.checkNameIsUnique(cid, name)
	);
	console.log(cid, res);
	if (!res.data) return name + " already exists";
}
