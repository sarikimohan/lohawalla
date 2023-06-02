import { apiIndex } from "../apis";
import CompanyProductListingInstance from "../instance";

interface CompanyProduct {
  _id: string;
  srNo: number;
  companyName: {
    imageURL: string;
    name: string;
  };
  ProductName: string;
  productId: string;
  entryTime: string;
}

export default async function fetchCompanyProductListingData(id: string){
  return await CompanyProductListingInstance.get<CompanyProduct[]>(apiIndex.getAllCompanyProductData(id))
}