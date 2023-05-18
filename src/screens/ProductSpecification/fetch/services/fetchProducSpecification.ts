import { apiIndex } from "../ApiIndex";
import ProductSpecificationInstance from "../instance";

interface ProductSpecificationData {
	productName: string;
		companyName: string;
		itemName: string;
		description: string;
		category: {
			name: string;
			_id: string;
		};
		descriptionLabels: {
			key: string;
			value: string;
			position: number;
		}[];
		priceStructure:  {
			name: string;
			type: 'numeric'|'percentage';
			operation: 'subtract'|'add';
			value: number;
			fixed: boolean;
		}[];
		margin: {
			online: number;
			cash: number;
		};
		gst: { key: string; value: string };
		images: string[];
}
export default async function fetchProductSpecification(id: string) {
	return await ProductSpecificationInstance.get<ProductSpecificationData>(
		apiIndex.getProductSpecification(id)
	);
}
