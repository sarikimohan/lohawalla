import apiIndex from "../apis";
import SetBasePriceInstance from "../instance";

interface DataFormat {
	srNo: number;
	companyName: {
		name: string;
		imageURL: string;
	};
	companyId: string;
	priceFieldId: string;
	cost: number;
	entryTime: string;
}

export default async function getBasePriceList() {
	return await SetBasePriceInstance.get<DataFormat[]>(apiIndex.getBasicPrice);
}
