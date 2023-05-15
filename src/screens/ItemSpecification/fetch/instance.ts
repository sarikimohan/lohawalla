import AxiosFactory from "@src/modules/axios/AxiosFactory";

const ItemSpecInstance = AxiosFactory.createInstance({
	baseURL: `purchaser/pages/itemSpecification/`,
});

export default ItemSpecInstance;
