namespace Graph{

  interface ReturnValueLog {
    date: string;
    value: number;
  }

  interface CpfGraphData {
    name: string;
    valueLog: ReturnValueLog[];
  }

  export interface State{
    data: CpfGraphData;
    loading:{[key:string]:AsyncState}
  }
}