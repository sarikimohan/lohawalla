import AxiosFactory from "@src/modules/axios/AxiosFactory";

const EditItemInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/forms/editItemForm/",
});

export default EditItemInstance;
