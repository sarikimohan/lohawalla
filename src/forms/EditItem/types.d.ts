namespace EditItem {
  interface State {
    itemName: FieldData;
    itemCode: FieldData;
    description: FieldData;

    images: string[];
    imageFiles: File[]; 
    addedImages: string[];
    
    margin: Margin;
    credit: Credit[];
    descriptionLabels: (DescriptionLabels & {_id:string})[]
  }
}