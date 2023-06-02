import apiIndex from "../apis";
import AddProductInstance from "../instance";

interface CheckProps {
	companyId: string;
	itemId: string;
}

export default async function checkIsEntryUnique(data: CheckProps) {
	return AddProductInstance.post<boolean>(
		apiIndex.isProductEntryUnique,
		data
	);
}
