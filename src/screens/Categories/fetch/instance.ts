import AxiosFactory from "@src/modules/axios/AxiosFactory";

const CategoriesInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/pages/category/",
});

export default CategoriesInstance;
