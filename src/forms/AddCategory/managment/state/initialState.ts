import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState : AddCategory.State = {
  categoryName: "",
  categoryCode: "",
  description: "",
  unit: "",
  images: [],
  credit: [],
  negotiation: 0,
  descriptionLabels: [],
  loading: {
    saveImage: AsyncStateFactory(),
    saveData: AsyncStateFactory(),
  }
}