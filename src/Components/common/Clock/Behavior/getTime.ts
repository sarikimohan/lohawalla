export default function getTime() {
	const date = new Date();
	let hr = date.getHours();
	const sector: "am" | "pm" = hr <= 12 ? "am" : "pm";
	hr = hr > 12 ? hr - 12 : hr;
	const mn = date.getMinutes();
	const sc = date.getSeconds();

	const prefixZero = (n: number) =>
		n < 10 ? "0" + n.toString() : n.toString();

	return {
		hr: prefixZero(hr),
		mn: prefixZero(mn),
		sc: prefixZero(sc),
		sector,
	};
}
