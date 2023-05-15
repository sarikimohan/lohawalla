const apiIndex = {
	getAllCompanyNames: "getAllCompanyNames",
	getAllCategoryNames: "getAllCategoryNames",
	getAllItemsOfCategory: (id: string) => `getAllItemsOfCategory/${id}`,
};

export default apiIndex;
