import apis from "@src/globals/constants/apis.constants";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import server from "@src/modules/axios/instances";
import { NameIdPair } from "@src/modules/backendTypes/change/NameIdPair";
import { S } from "@storybook/react/dist/types-0a347bb9";



  interface DescriptionData{
    key: string,
    value: string,
    position: number
  }
  interface FormFields {
    cid:string,
    name: string,
    HSNCode: number,
    code: number,
    margin: {
      online: number;
      cash: number;
    },
    by: NameIdPair,
    description: string,
    images: string[],
    descriptionLables: DescriptionData[],
  }

export default class SubmitActions extends StateUtils<AddItem.State>{
  async saveForm(images: string[], id: string,by: NameIdPair){
    const data: FormFields = {
      cid: id,
      name: this.state.itemName.value,
      HSNCode: parseInt(this.state.itemHSNCode.value),
      code: parseInt(this.state.itemCode.value),
      margin: {
        online: parseInt(this.state.margin.online.value) ,
        cash: parseInt(this.state.margin.cash.value)
      },
      by: {
        name: by.name,
        id: by.id
      },
      description: this.state.description.value,
      images: images,
      descriptionLables: this.state.descriptionLabels.map((v,i)=>({
        key: v.key,
        value: v.value.value,
        position: i
      }))
    }
    
    this.mutateState(p=>{
      p.loading.saveData.status ="initialized"
    })

    try{
      await server.post(apis.createItem, data)
        this.mutateState(p=>{
          p.loading.saveData.status = "success"
        })
    }catch(err){
      this.mutateState(p=>{
        p.loading.saveData.status = "failed"
      })
    }
  }
}