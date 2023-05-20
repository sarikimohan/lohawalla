import AxiosFactory from "@src/modules/axios/AxiosFactory";

const BrowseInstance = AxiosFactory.createInstance({
  baseURL: 'purchaser/pages/browseItem'
})

export default BrowseInstance;