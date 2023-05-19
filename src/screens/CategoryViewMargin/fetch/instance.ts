import AxiosFactory from "@src/modules/axios/AxiosFactory";

const CategoryViewMarginInstance = AxiosFactory.createInstance({
  baseURL: 'purchaser/pages/categoryViewMargin/'
})

export default CategoryViewMarginInstance;