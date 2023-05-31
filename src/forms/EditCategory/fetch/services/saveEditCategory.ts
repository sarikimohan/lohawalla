import EditCategory from "../../EditCategory";
import apiIndex from "../apis";
import EditCategoryInstance from "../instances";
export interface EditData {
  id: string;
  name: string;
  code: string;
  discription: string;
  negotiation: number;
  image: string[];
  credit: {
    days: number;
    value: number;
    type: PercNum;
  }[];
  descriptionLabels: {
    key: string;
    value: string;
    position: number;
  }[];
  by: NameIdPair;
}
export default async function saveEditCategory(data : EditData) {
  return await EditCategoryInstance.post(apiIndex.editCategory, data);
}