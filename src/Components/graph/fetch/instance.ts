import AxiosFactory from "@src/modules/axios/AxiosFactory";

const GraphInstance = AxiosFactory.createInstance({
  baseURL:"purchaser/graphs/companyPriceFieldGraph/"
})

export default GraphInstance