namespace EditItem {
  interface State {
    itemName: string;
    itemCode: string;
    description: string;

    images: string[];
    imageFiles: File[]; 
    addedImages: string[];
    
    margin: Margin;
    credit: Credit[];
    descriptionLabels: DescriptionLabels[]
  }
}