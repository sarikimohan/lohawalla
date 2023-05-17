import apiIndex from "../apis";
import UnitInstance from "../instance";

export default async function checkNameUnique(name: string) {
	return await UnitInstance.get<boolean>(apiIndex.checkNameUnique(name));
}
