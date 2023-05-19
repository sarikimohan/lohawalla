import AxiosFactory from "@src/modules/axios/AxiosFactory";

const CompSpecInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/pages/companySpecification/",
});

export default CompSpecInstance;
