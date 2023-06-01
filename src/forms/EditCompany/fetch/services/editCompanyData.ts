import apiIndex from "../apis";
import EditCompanyInstance from "../instance";

export interface EditedFormData {
	_id: string;
	companyName: string;
	description: string;
	images: string[];
  deletedImages: string[];
	priceStructure: {
		_id: string;
		name: string;
		value: number | null;
		position: number;
		isFixed: boolean;
		type: PercNum;
		operation: OpType;
		wasAdded?: boolean;
	}[];
	deletedId: string[];
	descriptionLabels: {
		key: string;
		value: string;
		position: number;
	}[];
	by: NameIdPair;
}

export default async function editCompanyData(data: EditedFormData) {
	return EditCompanyInstance.post(apiIndex.editCompany, data);
}
