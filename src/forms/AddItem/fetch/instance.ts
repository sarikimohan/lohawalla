import AxiosFactory from "@src/modules/axios/AxiosFactory";

const AddItemInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/forms/itemForm/",
});

export default AddItemInstance;
