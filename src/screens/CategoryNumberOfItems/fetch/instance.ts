import AxiosFactory from "@src/modules/axios/AxiosFactory";

const CatNoItemsInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/pages/categoryNumberOfItems/",
});

export default CatNoItemsInstance;
