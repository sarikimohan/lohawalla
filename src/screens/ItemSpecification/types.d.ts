namespace ItemSpecification {
  interface CompanyProduct {
    _id: string;
    srNo: number;
    company: {
      name: string;
      imageURL: string;
    };
    companyProductName: string;
  }
  
  const GST_PERCENTAGE_VALUES = {
    0: 0,
    5: 5,
    12: 12,
    18: 18, 
    28: 28
  }
  
  interface GSTDetails {
    value: number;
    type: 'numeric' | 'percentage';
  }
  
  interface Margin {
    online: number;
    cash: number; 
  }
  
  interface ItemSpecification {
    companyProductName: string;
    description: string;
    descriptionLabels: DescriptionLabels[];
    productList: CompanyProduct[];
      filter: Filter;
    gst: GSTDetails;
      loading: {
        fetchData: AsyncState
      }
  }
}