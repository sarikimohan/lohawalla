import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export const apiIndex = {
	createCategory: "purchaser/forms/categoryForm/createCategory",
	isNameUnique: (name: string) => `isNameUnique/${name}`,
	isCodeUnique: (code: string) => `isCodeUnique/${code}`,
};
