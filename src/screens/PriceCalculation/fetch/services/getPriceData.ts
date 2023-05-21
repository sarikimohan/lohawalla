import apiIndex from "../apis";
import PriceCalculationInstance from "../instance";

export interface PriceFields {
	name: string;
	value: number;
	operation: OpType;
	type: PercNum;
	position: number;
}

export interface Credits {
	days: number;
	value: number;
	type: PercNum;
}
export interface calculationData {
	productName: string;
	companyName: string;
	productImage: string;
	priceStructureUnit: string;
	priceField: PriceFields[];
	margin: {
		cash: number;
		online: number;
	};
	negotiation: number;
	creditMargin: Credits[];
	GST: {
		type: string;
		value: number;
	};
}

export default async function getPriceData(id: string) {
	return await PriceCalculationInstance.get<calculationData>(
		apiIndex.getPriceCalculationData(id)
	);
}
