export const InitialState: ProductSpecification.State = {
  productName: "",
  companyName: "",
  itemName: "",
  description: "",
  descriptionLabels: [],
  priceStructure: [],
  margin: {online: 0, cash: 0},
  gst: {value: 0, type:'numeric'},
  images: []
}