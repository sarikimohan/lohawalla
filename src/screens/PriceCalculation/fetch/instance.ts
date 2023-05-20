import AxiosFactory from "@src/modules/axios/AxiosFactory";

const PriceCalculationInstance = AxiosFactory.createInstance({ 
  baseURL: 'purchaser/pages/priceCalculation/'
})

export default PriceCalculationInstance;