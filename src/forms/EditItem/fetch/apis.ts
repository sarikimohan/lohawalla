export const apiIndex = {
	getEditItemForm: (id: string) => `getEditFormData/${id}`,
	checkNameIsUnique: (name: string) => `checkNameIsUnique/${name}`,
	checkCodeIsUnique: (code: string) => `checkCodeIsUnique/${code}`,
	editItem: "editItem",
};
