import AxiosFactory from "../axios/AxiosFactory";

const SaveImageInstance = AxiosFactory.createInstance({
	baseURL: "images/",
});

export default SaveImageInstance;