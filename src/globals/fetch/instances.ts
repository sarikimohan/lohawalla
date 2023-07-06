import AxiosFactory from "@src/modules/axios/AxiosFactory";

export const DeleteInstance = AxiosFactory.createInstance({
  baseURL: 'purchaser/delete/'
});