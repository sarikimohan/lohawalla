import apiIndex from "../apis";
import CategoryViewMarginInstance from "../instance";

interface ItemMarginGridData {
	srNo: number;
	itemName: {
		name: string;
		imageURL: string;
	};
	itemId: string;
	marginId: string;
	cashMargin: number;
	onlineMaring: number;
}

export default async function fetchViewMargin(id: string) {
	return await CategoryViewMarginInstance.get<ItemMarginGridData[]>(
		apiIndex.getCategoryViewMargin(id)
	);
}
