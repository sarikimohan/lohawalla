import apiIndex from "../apis";
import CatNoItemsInstance from "../instance";

export interface SaveActiveCompanyProps {
	itemId: string;
	companyId: string | null;
	by: NameIdPair;
}

export default async function setActiveCompany(data: SaveActiveCompanyProps) {
	await CatNoItemsInstance.post(apiIndex.setActiveCompany, data);
}
