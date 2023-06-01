import AxiosFactory from "@src/modules/axios/AxiosFactory";

const getActiveCompanyInstance = AxiosFactory.createInstance({
  baseURL: "purchaser/form/setActiveCompanyForm/"
})

export default getActiveCompanyInstance