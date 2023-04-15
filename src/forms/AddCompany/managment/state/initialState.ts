import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState : AddCompany.State = {
  companyName: "",
  description: "",
  images: [],
  priceStructure: [],
  tempPriceStructure: [],
  descriptionLabels: [],
  loading: {
    savedImages: AsyncStateFactory(),
    savedData: AsyncStateFactory(),
  }
}