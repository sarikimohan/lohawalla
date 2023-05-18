import apiIndex from "../apis";
import AddProductInstance from "../instance";

export interface Unit {
	id: string;
	name: string;
	weight: number;
}

export default async function getAllUnits() {
	return await AddProductInstance.get<Unit[]>(apiIndex.getAllUnits);
}
