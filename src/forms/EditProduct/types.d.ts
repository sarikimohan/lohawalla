namespace EditProduct {
  interface State {
    selectedCompany: string;
    selectedCategory: string;
    selectedItem: string;
    productName: FieldData;
    productCode: FieldData;
    description: FieldData;

    images: string[];
    addedImages: string[];
    imageFiles: File[];

    priceStructure: (PriceField & {_id: string})[];
  }
}