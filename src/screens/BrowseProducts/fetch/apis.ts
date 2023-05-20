const apiIndex = {
	getBrowseItemData: (
		companyId: string,
		categoryId?: string,
		itemId?: string
	) =>
		`getBrowseItemData?companyId=${companyId}&categoryId=${categoryId}&itemId=${itemId}`,
	saveBrowseProduct: "saveBrowseProduct",
};

export default apiIndex;
