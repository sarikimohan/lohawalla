import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import fetchGraphInfo from "../../fetch/service/fetchGraphInfo";

export default class fetchGraphInfoAction extends ServerStateUtils<Graph.State>{
 async fetchGraphInfoData(id:string,x:string,y:string){
  const res = await this.handleAsync("fetchGraphInfo",()=>fetchGraphInfo(id,x, y))
  if(res){
    const data = res.data
    console.log(data)
    this.mutateState((p)=>{
      p.data = data
    })
  }
 }
}