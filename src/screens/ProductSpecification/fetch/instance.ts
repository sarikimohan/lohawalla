import AxiosFactory from "@src/modules/axios/AxiosFactory";

const ProductSpecificationInstance = AxiosFactory.createInstance({
    baseURL: "purchaser/pages/productSpecification/",
});

export default ProductSpecificationInstance; 