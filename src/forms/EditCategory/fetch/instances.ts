import AxiosFactory from "@src/modules/axios/AxiosFactory";

const EditCategoryInstance = AxiosFactory.createInstance({
	baseURL: "purchaser/forms/editCategoryForm/",
});

export default EditCategoryInstance;