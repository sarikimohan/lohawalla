namespace PriceCalculation {
	export interface PriceFields{
    name:string,
    value:number,
    operation: OpType,
    type: PercNum,
    position: number
  }

  export interface Credits{
    days: number,
    value: number
  }
  export interface calculationData {
    productName: string,
    companyName: string,
    productImage: string,
    priceStructureUnit: string,
    priceField: PriceFields[],
    margin:{
      cash: number,
      online: number,
    },
    negotiation: number,
    creditMargin: Credits[],
    GST:{
      type:string,
      value:number
    }
  }
  interface State {
    calculationData: calculationData;
    
  }
}
