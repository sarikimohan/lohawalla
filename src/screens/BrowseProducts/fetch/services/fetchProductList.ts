import apiIndex from "../apis";
import BrowseInstance from "../instance";

export interface GridDataFormat {
	srNo: number;
	productName: {
		imgURL: string;
		name: string;
	};
	prodId: string;
	priceStructure: {
		_id: string /*company product price  field*/;
		name: string /*referenced cpfid*/;
		value: number /*cppfid valuelog last value*/;
		isFixed: boolean /*cpfid*/;
		position: number /*cpfid*/;
		type: PercNum /*cpfid*/;
		operation: OpType /*cpfid*/;
		date: string /*cppfid valuelog*/;
	}[];
}

export interface FetchCompanyProductListResponseBody {
	gridHeader: string[];

	gridData: GridDataFormat[];
}

export default async function fetchProductList(
	companyId: string,
	categoryId?: string,
	itemId?: string
) {
	return await BrowseInstance.get<FetchCompanyProductListResponseBody>(
		apiIndex.getBrowseItemData(companyId, categoryId, itemId)
	);
}
