export const InitialState: ItemSpecification.ItemSpecification ={
  itemName: "",
  categoryName: "",
  description: "",
  descriptionLabels: [],
  margin: {online: 0, cash: 0},
  gst: {value: 0, type:'numeric'},
  companyProductList: [],
  filter: {
    query: '',
    filters : []
  }
}