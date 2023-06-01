import { apiIndex } from "../apis";
import getActiveCompanyInstance from "../instance";

export interface Data {
  activeCompany: {
    name: string;
    _id: string;
  } | null;
  inActiveCompanies: {
    _id: string;
    name: string;
  }[];
}
export default async function fetchActiveCompany(id:string) {
  return await getActiveCompanyInstance.get<Data>(apiIndex.getSetActiveCompanyData(id))
}