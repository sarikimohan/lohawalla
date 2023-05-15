import AxiosFactory from "@src/modules/axios/AxiosFactory";

const AddProductInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/forms/companyProductForm/",
});

export default AddProductInstance;
