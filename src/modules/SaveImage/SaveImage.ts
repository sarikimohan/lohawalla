import AxiosFactory from "../axios/AxiosFactory";

const SaveImageInstance = AxiosFactory.createInstance({
	baseURL: "images/",
});

export default async function SaveImage(files: File[] | null) {
	const formData = new FormData();
	if (files) {
		for (let i = 0; i < Math.min(files.length, 10); ++i) {
			formData.append("image", files[i]);
		}
		return await SaveImageInstance.post<string[]>("upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	}
}
