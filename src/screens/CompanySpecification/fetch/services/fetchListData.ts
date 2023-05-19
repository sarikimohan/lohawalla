import apiIndex from "../apis";
import CompSpecInstance from "../instance";

interface CompanyItemsGridData {
  _id: string;
	srNo: number;
	company: {
		imageURL: string;
		name: string;
	};
	companyProductName: string;
}
export default async function fetchListData(id: string) {
	return await CompSpecInstance.get<CompanyItemsGridData[]>(
		apiIndex.getAllCompanyItem(id)
	);
}
