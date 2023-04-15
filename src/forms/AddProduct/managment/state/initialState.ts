export const InitialState: AddProduct.State={
  companyList: [],
  categoryList: [],
  itemList: [],
  selectedCompany: {id: '', name: ''},
  selectedItem: {id: '', name: ''},
  selectedCategory: {id: '', name: ''},
  images: [],
  priceStructure: [],
  margin: {
    online: 0,
    cash: 0,
  },
  credit: [],
  negotiation: 0,
  gst: {
    value: 0,
    type: 'numeric',
  },
  description: "",
  descriptionLabels: []
}