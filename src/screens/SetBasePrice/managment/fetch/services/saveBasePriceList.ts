import apiIndex from "../apis";
import SetBasePriceInstance from "../instance";

interface PostData {
	list: {
		priceFieldId: string;
		value: number;
	}[];
	by: NameIdPair;
}

export default async function saveBasePriceList(data: PostData) {
	return await SetBasePriceInstance.post<PostData>(
		apiIndex.saveBasicPrice,
		data
	);
}
