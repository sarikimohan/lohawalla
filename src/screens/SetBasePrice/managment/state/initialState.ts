import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

export const InitialState: SetBasePrice.State = {
  setList: [],
  filter: {
    query: '',
    filters : []
  },
  loading: {
    fetch: AsyncStateFactory()
  }
}