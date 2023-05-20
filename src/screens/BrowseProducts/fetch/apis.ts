const apiIndex = {
	getBrowseItemData: (
		companyId: string,
		categoryId?: string,
		itemId?: string
	) =>
		`getBrowseItemData?companyId=${companyId}` +
		(categoryId ? `&categoryId=${categoryId}` : "") +
		(itemId ? `&itemId=${itemId}` : ""),
	saveBrowseProduct: "saveBrowseProduct",
};

export default apiIndex;
