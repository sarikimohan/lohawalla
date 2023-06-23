import { apiIndex } from "../apis";
import EditItemInstance from "../instances";

export default async function checkCodeIsUnique(
	cid: string,
	code: string,
	hasChanged: boolean
) {
	if (!hasChanged) return;
	const res = await EditItemInstance.get<boolean>(
		apiIndex.checkCodeIsUnique(cid, code)
	);
	if (!res.data) return code + " already exists";
}
