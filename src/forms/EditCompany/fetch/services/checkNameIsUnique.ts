import apiIndex from "../apis";
import EditCompanyInstance from "../instance";

export default async function checkNameIsUnique(
	name: string,
	hasChanged: boolean
) {
	if (hasChanged === false) return;
	const res = await EditCompanyInstance.get<boolean>(
		apiIndex.checkNameIsUnique(name)
	);
	if (res.data === false) {
		return name + " already exists";
	}
}
