const apiIndex = {
	getCategoryData: (id: string) => `getAllCategorySpecification/${id}`,
	getItemList: (id: string) => `getCategoryItems/${id}`,
	deleteCategory: (id: string) => `deleteCategory/${id}`,
};

export default apiIndex;
