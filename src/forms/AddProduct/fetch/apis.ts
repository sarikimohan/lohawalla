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
	getAllUnits: 'getAllUnit',
	getCategoryUnit: (id: string) => `/getCategoryUnit/${id}`,
	isProductEntryUnique: 'isProductEntryUnique'
};

export default apiIndex;
