import { apis } from "../api";
import AddCompanyInstance from "../instance";

export default async function checkIsNameUnique(name: string) {
	return await AddCompanyInstance.get<boolean>(apis.checkIsNameUnique(name));
}
