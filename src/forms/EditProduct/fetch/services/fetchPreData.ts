import apiIndex from "../apis";
import EditProductInstance from "../instance";


export interface PreData {
  selectedCompany: string;
  selectedCategory: string;
  selectedItem: string;

  images: string[];

  // give sorted 
  priceStructure: {
    _id: string;
    name: string;
    value: number;
    isFixed: boolean;
    type: PercNum;
    operation: OpType;
  }[];

  margin: {
    online: number;
    cash: number;
  };
  credits: { day: number; isNumeric: boolean; value: number }[];

  negotiation: number;

  gst: {
    type: PercNum;
    value: number;
  };

  description: string;
  // give sorted 
  descriptionLabels: {
    key: string;
    value: string;
  }[];
}


export default async function fetchPreData(id: string) {
  return EditProductInstance.get<PreData>(apiIndex.fetchEditCompanyProductData(id));
}