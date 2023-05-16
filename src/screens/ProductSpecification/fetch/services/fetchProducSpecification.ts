import { apiIndex } from "../ApiIndex";
import ProductSpecificationInstance from "../instance";

export interface ProductSpecification {
    productName: string;
    companyName: string;
    itemName: string;
    description: string;
    descriptionLabels: DescriptionLabels[];
    priceStructure: PriceField[];
    margin: Margin;
    gst: { key: string, value: string | number };
    images: string[];

    loading: {
        fetch: AsyncState
    }
}

export default async function fetchProductSpecification() {
    return await ProductSpecificationInstance.get<ProductSpecification>(apiIndex.getProductSpecification);
}
