const apiIndex = {
	getFormData: (id: string) => `getEditCategoryData/${id}`,
	isNameUnique: (name: string) => `isNameUnique/${name}`,
	isCodeUnique: (code: string) => `isCodeUnique/${code}`,
	editCategory: "editCategory",
};

export default apiIndex;
