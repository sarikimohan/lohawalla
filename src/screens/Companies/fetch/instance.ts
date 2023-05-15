import AxiosFactory from "@src/modules/axios/AxiosFactory";
import { Axios } from "axios";


const CompaniesInstance = AxiosFactory.createInstance({
  baseURL: "purchaser/pages/company/"
})

export default CompaniesInstance;