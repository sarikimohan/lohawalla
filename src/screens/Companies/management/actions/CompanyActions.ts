import { getCompanyGridData } from "@src/globals/constants/async";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";

export default class CompanyActions
  extends StateUtils<Companies.State>
  implements Companies.Actions{

  CompanyListRow(): void {
    this.mutateState((p)=>{
      p.loading.fetchCompanyList.status = 'initialized'
    })
    getCompanyGridData()
    .then((res)=>{
      this.mutateState((p)=>{
        const arr: any[] = [];
        for(let data of res){  
          const newData: Companies.CompanyListRow = {
            _id: data._id,
            srNo: data.srNo,
            companyName: {
              imageURL: data.companyName.imageURL,
              name: data.companyName.name
            },
            price: data.price,
            entryTime: data.entryTime,
            noOfProducts: data.noOfProducts
          }
        }
      })
    })
    .catch((err)=>{
      this.mutateState((p) => {
        p.loading.fetchCompanyList = {
          status: "failed",
          message: "some error occured",
        };
      })  
    })
  }
  
  filterCompanylistRow(): Companies.CompanyListRow[] {
    return this.state.companyList.filter((v)=>{
      for(let filter of this.state.filter.filters){
        if(filter.isActive){
          const query = this.state.filter.query.toLowerCase().trim();
					if (filter.name === "company name") {
						if(isPrefix(v.companyName.name.toLowerCase(), query)) return true;
					}
        }
      }
      return false;
    })
  }
  setQuery(query: string) {
		this.mutateState((p) => {
			p.filter.query = query;
		});
	}  
}