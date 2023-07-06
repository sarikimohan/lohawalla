import { DeleteInstance } from "@src/globals/fetch/instances";
import apiIndex from "../apis";

export default async function deleteCompany(id: string) {
	return DeleteInstance.post(apiIndex.deleteCompany(id));
}
