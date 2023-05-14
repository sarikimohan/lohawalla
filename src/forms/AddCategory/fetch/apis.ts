import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export const apiIndex = {
	createCategory: "createCategory",
	isNameUnique: (name: string) => `isNameUnique/${name}`,
	isCodeUnique: (code: string) => `isCodeUnique/${code}`,
};
