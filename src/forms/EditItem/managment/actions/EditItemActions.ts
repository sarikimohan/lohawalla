import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class EditItemActions extends StateUtils<EditItem.State>{
  setName(data:string){
    this.mutateState(p=>{
      p.itemName.value = data
    })
  }

  setCode(data: string){
    this.mutateState(p=>{
      p.itemCode.value = data
    })
  }

  setDescription(data:string){
    this.mutateState(p=>{
      p.description.value = data
    })
  }

  validateForm(){
    let verdict = true
    const err : {
      name?: string,
      code?: string,
      des?: string
    }= {
      name : undefined,
      code : undefined,
      des : undefined
    }
    const req = "required"

    if(this.state.itemName.value = ""){
      err.name = req;
      verdict= false
    }

    if(this.state.itemCode.value =""){
      err.code = req;
      verdict= false
    }

    if(this.state.description.value = ""){
      err.des = req;
      verdict = false
    }

    this.mutateState(p=>{
      p.itemName.error = err.name
      p.itemName.isValid = !err.name

      p.itemCode.error = err.code
      p.itemCode.isValid = !err.code

      p.description.error = err.des
      p.description.isValid = !err.des
    
    })

    return verdict
  }

}