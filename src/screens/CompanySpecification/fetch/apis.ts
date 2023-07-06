const apiIndex = {
	getCompanySpecificationData: (id: string) =>
		"getCompanySpecificationData/" + id,
	getAllCompanyItem: (id: string) => "getAllCompanyItem/" + id,
	deleteCompany: (id: string) => `deletecompany/${id}`,
};
export default apiIndex;
