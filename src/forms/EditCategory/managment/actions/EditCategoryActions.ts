import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class EditCategoryActions extends StateUtils<EditCategory.State> {
  setName(d: string) {
    this.mutateState(p=>{
      p.categoryName.value = d
    })
  }
  setCode(d: string) {
    this.mutateState(p=>{
      p.categoryCode.value= d
    })
  }
  setDescription(d: string) {
    this.mutateState(p=>{
      p.description.value = d
    })
  }

  validateForm(){
    let verdict = true;
    const err: {
			key?: string;
			value?: string;
		} = {
			key: undefined,
			value: undefined,
		};

    const req= "required"

    if(this.state.categoryName.value ===""){
      err.key = req;
      verdict = false
    }

    if(this.state.categoryCode.value===""){
      err.key= req;
      verdict= false
    }

    if(this.state.description.value===""){
      err.key = req;
      verdict=false;
    }

    return verdict

  }
  
  
}
