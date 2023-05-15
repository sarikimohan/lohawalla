import apiIndex from "../apis";
import AddProductInstance from "../instance";

interface FormData {
	companyId: string;
	categoryId: string;
	itemId: string;
	priceStructure: {
		_id: string;
		value: number;
	}[];
	by: NameIdPair;
	gst: {
		type: PercNum;
		value: number;
	};
	description: string;
	descriptionLabels: {
		position: number;
		key: string;
		value: string;
	}[];
	images: string[];
}

export default async function saveProduct(data: FormData) {
	AddProductInstance.post<FormData>(apiIndex.createCompanyProduct, data);
}
