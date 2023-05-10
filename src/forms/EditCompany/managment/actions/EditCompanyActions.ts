import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class EditCompanyActions extends StateUtils<EditCompany.State>{
  setCompanyName(data:string){
    this.mutateState(p=>{
      p.companyName.value = data
    })
  }

  setDescription(data: string){
    this.mutateState(p=>{
      p.description.value = data
    })
  }

  validateForm(){
    let verdict = true
    const err: {
      companyName? : string,
      des? :string
    } = {
      companyName : undefined,
      des : undefined
    }

    const req = "required"

    if(this.state.companyName.value = ""){
      err.companyName = req
      verdict = false
    }

    if(this.state.description.value =""){
      err.des= req;
      verdict= false
    }

    this.mutateState(p=>{
      p.companyName.error = err.companyName
      p.companyName.isValid = !err.companyName

      p.description.error = err.des
      p.description.isValid= !err.des
    })

    return verdict
  }
}