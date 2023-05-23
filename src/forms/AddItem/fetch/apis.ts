export const apis = {
	createItem: "createItem",
	checkIsNameUnique: (name: string) => `isNameUnique/${name}`,
	checkIsCodeUnique: (code: string) => `isCodeUnique/${code}`,
};
