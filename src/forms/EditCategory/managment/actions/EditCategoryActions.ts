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
			name?: string;
			code?: string;
      des?: string
		} = {
			name: undefined,
			code: undefined,
      des: undefined
		};

    const req= "required"

    if(this.state.categoryName.value ===""){
      err.name = req;
      verdict = false
    }

    if(this.state.categoryCode.value===""){
      err.code= req;
      verdict= false
    }

    if(this.state.description.value===""){
      err.des = req;
      verdict=false;
    }

    this.mutateState(p=>{
      p.categoryName.error = err.name
      p.categoryName.isValid = !err.name

      p.categoryCode.error= err.code
      p.categoryCode.isValid= !err.code

      p.description.error = err.des
      p.description.isValid = !err.des
    });

    return verdict
  }
  
  
}
