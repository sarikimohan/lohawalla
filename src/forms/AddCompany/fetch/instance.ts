import AxiosFactory from "@src/modules/axios/AxiosFactory";

const AddCompanyInstance = AxiosFactory.createInstance({
  baseURL: 'purchaser/forms/companyForm/'
});

export default AddCompanyInstance;
