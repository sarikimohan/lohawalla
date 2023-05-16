import { apiIndex } from "../apis";
import EditItemInstance from "../instances";

export default async function getEditItemFormData(id: string) {
	return await EditItemInstance.get<EditItemAsync.GetEditItemData>(
		apiIndex.getEditItemForm(id)
	);
}
