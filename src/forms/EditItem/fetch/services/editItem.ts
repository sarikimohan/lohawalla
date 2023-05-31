import { apiIndex } from "../apis";
import EditItemInstance from "../instances";

export interface EditItemData {
	id: string;
	name: string;
	code: string;
	HSNCode: number;
	description: string;
	images: string[];
	deletedImages: string[];
	margin: {
		online: number;
		cash: number;
	};
	descriptionLabels: {
		key: string;
		value: string;
		position: number;
	}[];
	by: NameIdPair;
}

export default async function editItem(data: EditItemData) {
	return EditItemInstance.post(apiIndex.editItem, data);
}
