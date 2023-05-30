import { apiIndex } from "../apis";
import EditItemInstance from "../instances";

export default async function checkCodeIsUnique(
	code: string,
	hasChanged: boolean
) {
	if (!hasChanged) return;
	const res = await EditItemInstance.get<boolean>(
		apiIndex.checkCodeIsUnique(code)
	);
	if (!res.data) return code + " already exists";
}
