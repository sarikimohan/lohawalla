namespace EditProduct {
  interface State {
    selectedCompany: string;
    selectedCategory: string;
    selectedItem: string;
    productName: string;
    productCode: string;
    description: string;

    images: string[];
    addedImages: string[];
    imageFiles: File[];

    priceStructure: (PriceField & {_id: string})[];
  }
}