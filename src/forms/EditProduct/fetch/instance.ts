import AxiosFactory from "@src/modules/axios/AxiosFactory";

const EditProductInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/forms/editCompanyProductForm/",
});

export default EditProductInstance;
