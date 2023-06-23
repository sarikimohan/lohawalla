export const apis = {
	createItem: "createItem",
	checkIsNameUnique: (categoryId: string, name: string) => `isNameUnique/${categoryId}/${name}`,
	checkIsCodeUnique: (categoryId: string, code: string) => `isCodeUnique/${categoryId}/${code}`,
	getAllUnits: 'getAllUnits'
};
