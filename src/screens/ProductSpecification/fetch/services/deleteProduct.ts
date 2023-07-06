import { DeleteInstance } from "@src/globals/fetch/instances";
import { apiIndex } from "../ApiIndex";

export default async function deleteProduct(id: string) {
	return DeleteInstance.post(apiIndex.deleteProduct(id));
}
