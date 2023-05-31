import AxiosFactory from "@src/modules/axios/AxiosFactory";

const EditCompanyInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/forms/editCompanyForm/",
});

export default EditCompanyInstance;
