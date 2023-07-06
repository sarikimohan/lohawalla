const apiIndex = {
	getItemSpec: (id: string) => `getItemSpecification/${id}`,
	getItemGridData: (id: string) => `getItemSpecificationGrid/${id}`,
	deleteItem: (id: string) => `deleteItem/${id}`,
};

export default apiIndex;
