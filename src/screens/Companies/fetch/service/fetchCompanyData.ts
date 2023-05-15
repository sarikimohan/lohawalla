import { api } from "../Api";
import CompaniesInstance from "../instance";

export interface CompanyListRow {
	_id: string;
	srNo: number;
	companyName: {
		imageURL: string;
		name: string;
	};
	price: number;
	entryTime: string;
	noOfProducts: number;
	rowStatus: RowStatus;
}

export default async function fetchCompanyData() {
	return await CompaniesInstance.get<CompanyListRow[]>(api.getAllCompanies);
}
