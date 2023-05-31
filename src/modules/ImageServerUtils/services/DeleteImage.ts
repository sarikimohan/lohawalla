import ImageInstance from "../instance";

export default async function DeleteImage(link: string) {
	await ImageInstance.post("delete", { link });
}
