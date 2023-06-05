import AxiosFactory from "../axios/AxiosFactory";

const ImageInstance = AxiosFactory.createInstance({
	baseURL: "imageService/",
});

export default ImageInstance;