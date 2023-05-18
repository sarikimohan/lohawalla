import { apiIndex } from "../apis";
import AddCategoryInstance from "../instance";

export interface FetchUnitResponse {
	id: string;
	name: string;
	weight: number;
}

export default async function fetchUnits() {
  return await AddCategoryInstance.get<FetchUnitResponse[]>(apiIndex.getAllUnits);
}
