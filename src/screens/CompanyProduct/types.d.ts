namespace CompanyProducts {
  interface CompanyProduct {
    _id: string;
    srNo: number;
    companyName: {
      imageURL: string;
      name: string;
    };
    price: number;
    entryTime: string;
    noOfProducts: number;
  }  
	interface State {
		products: CompanyProduct[];
		filter: Filter;
	}
}
