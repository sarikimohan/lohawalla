import AxiosFactory from "@src/modules/axios/AxiosFactory";

const AddCategoryInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/forms/categoryForm/",
});

export default AddCategoryInstance;
