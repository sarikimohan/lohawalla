import apiIndex from "../apis";
import AddProductInstance from "../instance";

interface SecondFormData {
	priceStructure: {
		_id: string;
		name: string;
		value: number;
		isFixed: boolean;
		position: number;
		type: PercNum;
		operation: OpType;
	}[];

	margin: {
		online: number;
		cash: number;
	};

	credits: { day: number; isNumeric: boolean; value: number }[];

	negotiation: number;
}
export default async function getSecondFormData(data: {
	companyId: string;
	categoryId: string;
	itemId: string;
}) {
	return await AddProductInstance.get<SecondFormData>(
		apiIndex.getSecondFormData(data)
	);
}
