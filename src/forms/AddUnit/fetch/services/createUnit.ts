import apiIndex from "../apis";
import UnitInstance from "../instance";

export interface CreateUnitBody {
	name: string;
	weight: number | null;
}

export default async function createUnit(data: CreateUnitBody) {
	return await UnitInstance.post(apiIndex.createUnit, data);
}
