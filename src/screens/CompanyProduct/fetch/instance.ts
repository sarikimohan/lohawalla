import AxiosFactory from "@src/modules/axios/AxiosFactory";

const CompanyProductListingInstance = AxiosFactory.createInstance({
  baseURL: "purchaser/pages/companyProductListing/"
})

export default CompanyProductListingInstance