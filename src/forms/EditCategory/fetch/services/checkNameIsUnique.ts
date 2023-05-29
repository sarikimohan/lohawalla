import apiIndex from "../apis";
import EditCategoryInstance from "../instances";

export default async function checkNameIsUnique(name: string, prevName: string) {
  if(name === prevName) return;
  const res = await EditCategoryInstance.get<boolean>(apiIndex.isNameUnique(name));
  if(!res.data) {
    return name + ' already exists';
  }
}