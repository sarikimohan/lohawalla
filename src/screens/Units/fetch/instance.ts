import AxiosFactory from "@src/modules/axios/AxiosFactory";

const UnitsInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/pages/Units/",
});

export default UnitsInstance;
