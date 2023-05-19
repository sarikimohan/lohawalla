import apiIndex from "../apis";
import CompSpecInstance from "../instance";

interface CompanySpecificationData {
  name: string;
  description: string;
  descriptionLabels: {
    key: string;
    value: string;
  }[];
  priceStructure: {
    name: string;
    value: number;
    type: PercNum;
    operation: OpType;
    position: number;
    fixed: boolean;
  }[];
  images: string[];
}

export default async function fetchSpecData(id: string) {
  return await CompSpecInstance.get<CompanySpecificationData>(apiIndex.getCompanySpecificationData(id));
}