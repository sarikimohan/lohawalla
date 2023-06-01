import apiIndex from "../apis";
import EditCompanyInstance from "../instance";

interface PreData {
	companyName: string;
	description: string;
	images: string[];
	priceStructure: {
		_id: string;
		name: string;
		value: number | null;
		isFixed: boolean;
		type: PercNum;
		operation: OpType;
	}[];
	descriptionLabels: {
		key: string;
		value: string;
	}[];
}

export default async function getPrevData(id: string) {
	return EditCompanyInstance.get<PreData>(apiIndex.getPrevData(id));
}
