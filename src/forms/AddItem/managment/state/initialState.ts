import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState : AddItem.State = {
  itemName: "",
  itemHSNCode: "",
  itemCode: "",
  images: [],
  margin: {
    online: 0,
    cash: 0,
  },
  description: "",
  descriptionLabels: [],
  loading: {
    imageUpload: AsyncStateFactory(),
    saveData: AsyncStateFactory(), 
  }
}