const apiIndex = {
	getAllCompanyNames: "getAllCompanyNames",
	getAllCategoryNames: "getAllCategoryNames",
	getAllItemsOfCategory: (id: string) => `getAllItemsOfCategory/${id}`,
	getSecondFormData: (data: {
		companyId: string;
		categoryId: string;
		itemId: string;
	}) =>
		`getSecondFormData?companyId=${data.companyId}&categoryId=${data.categoryId}&itemId=${data.itemId}`,
	createCompanyProduct: "createCompanyProduct",
};

export default apiIndex;
