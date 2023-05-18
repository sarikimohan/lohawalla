import apiIndex from "../apis";
import UnitsInstance from "../instance";

export interface UnitResponseData {
	srNo: number;
	name: string;
	weight: number;
	categoryCount: number;
	productCount: number;
}
export default async function fetchUnits() {
	return await UnitsInstance.get<UnitResponseData[]>(apiIndex.getAllUnits);
}
