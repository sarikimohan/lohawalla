export const apiIndex = {
	createCategory: "createCategory",
	isNameUnique: (name: string) => `isNameUnique/${name}`,
	isCodeUnique: (code: string) => `isCodeUnique/${code}`,
	getAllUnits: "getAllUnits",
};
