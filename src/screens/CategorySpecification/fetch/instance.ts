import AxiosFactory from "@src/modules/axios/AxiosFactory";

const CategorySpecificationInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/pages/categorySpecification/",
});

export default CategorySpecificationInstance;
