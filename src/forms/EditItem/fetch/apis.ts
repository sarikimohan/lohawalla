export const apiIndex = {
	getEditItemForm: (id: string) => `getEditFormData/${id}`,
	checkNameIsUnique: (cid: string, name: string) =>
		`checkNameIsUnique/${cid}/${name}`,
	checkCodeIsUnique: (cid: string, code: string) =>
		`checkCodeIsUnique/${cid}/${code}`,
	editItem: "editItem",
};
