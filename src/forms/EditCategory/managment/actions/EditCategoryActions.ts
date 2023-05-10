import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class EditCategoryActions extends StateUtils<EditCategory.State> {
  setName(d: string) {
    this.mutateState(p=>{
      p.categoryName = d
    })
  }
  setCode(d: string) {
    this.mutateState(p=>{
      p.categoryCode = d
    })
  }
  setDescription(d: string) {
    this.mutateState(p=>{
      p.description = d
    })
  }
  
}
