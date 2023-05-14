export const apis = {
	createItem: "purchaser/forms/itemForm/createItem",
	checkIsNameUnique: (name: string) => `isNameUnique/${name}`,
	checkIsCodeUnique: (code: string) => `isCodeUnique/${code}`,
};
