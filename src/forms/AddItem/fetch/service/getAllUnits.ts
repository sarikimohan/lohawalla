import { apis } from "../apis";
import AddItemInstance from "../instance";

export interface UnitListItem{
  id: string;
  name: string;
  weight: number | null;
}

export default async function getAllUnits() {
  return AddItemInstance.get<UnitListItem[]>(apis.getAllUnits);
}