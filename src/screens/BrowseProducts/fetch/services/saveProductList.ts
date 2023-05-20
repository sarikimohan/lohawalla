import apiIndex from "../apis";
import BrowseInstance from "../instance";

interface saveData {
	list: {
		cpfid: string;
		value: number;
	}[];
	by: NameIdPair;
}

export default async function saveProductList(data: saveData) {
	return await BrowseInstance.post(apiIndex.saveBrowseProduct, data);
}
