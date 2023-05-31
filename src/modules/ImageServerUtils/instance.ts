import AxiosFactory from "../axios/AxiosFactory";

const ImageInstance = AxiosFactory.createInstance({
	baseURL: "images/",
});

export default ImageInstance;