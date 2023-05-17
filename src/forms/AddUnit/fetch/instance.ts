import AxiosFactory from "@src/modules/axios/AxiosFactory";

const UnitInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/pages/Units/",
});

export default UnitInstance;
