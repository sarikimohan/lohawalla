import AxiosFactory from "@src/modules/axios/AxiosFactory";

const SetBasePriceInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/pages/setBasicPrice/",
});

export default SetBasePriceInstance;
