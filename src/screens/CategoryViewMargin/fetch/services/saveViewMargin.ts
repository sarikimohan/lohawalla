import apiIndex from "../apis";
import CategoryViewMarginInstance from "../instance";

interface PostData {
	list: {
		marginId: string;
		cashValue?: number;
		onlineValue?: number;
	}[];
	by: NameIdPair;
}

export default async function saveViewMargin(d: PostData) {
	return await CategoryViewMarginInstance.post(apiIndex.saveViewMargin, d);
}
