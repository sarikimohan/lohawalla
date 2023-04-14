namespace Categories {
  export  interface CategoryGridData {
    _id: string;
    srNo: number;
    categoryName: {
      name: string;
      imageURL: string|null;
    };
    categoryCode: number;
    entryTime: string;
    noOfItems: number;
    rowStatus: {
      isFixed: boolean;
      fixedPosition: number;
    };
  }

  interface State {
    categoryList: CategoryListData[];
    filter: Filter;
    loading: {
      fetchCategoryList: AsyncState;
    }
  }
}
