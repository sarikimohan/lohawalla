const apiIndex = {
	getCategoryData: (id: string) => `getAllCategorySpecification/${id}`,
	getItemList: (id: string) => `getCategoryItems/${id}`,
};

export default apiIndex;