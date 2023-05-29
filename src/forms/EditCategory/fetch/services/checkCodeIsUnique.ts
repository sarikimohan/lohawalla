import apiIndex from "../apis";
import EditCategoryInstance from "../instances";

export default async function checkCodeIsUnique(
	code: string,
	prevCode: string
) {
	if (code === prevCode) return;
	const res = await EditCategoryInstance.get<boolean>(
		apiIndex.isCodeUnique(code)
	);
	if (!res.data) {
		return code + " already exists";
	}
}
