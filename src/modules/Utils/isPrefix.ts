export default function isPrefix(s1: string, s2: string) {
	const n = s1.length;
	const m = s2.length;

	if (m > n) return false;

	for (let i = 0; i < m; ++i) {
		if (s1[i] !== s2[i]) return false;
	}
	return true;
}
