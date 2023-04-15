namespace CompanyProducts {
  interface CompanyProduct {
    _id: string;
    srNo: number;
    companyName: {
      imageURL: string;
      name: string;
    };
    companyProductName: string;
  }  
	interface State {
		products: CompanyProduct[];
		filter: Filter;
	}

  interface Actions{

  }
}
