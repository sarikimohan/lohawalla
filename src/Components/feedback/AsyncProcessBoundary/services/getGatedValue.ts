/**
 * function that returns the first value whose gate is true,
 * @description if the list can contain all gates with false values, then consider using undefined type with the union of the type of the value
 * @param gateList the list with value and the gate for the value
 * @returns the first value whose gate is true
 */
export default function getGatedValue<T = string>(
	gateList: {
		value: T;
		gate: boolean;
	}[]
): T {
	const filtered = gateList.filter((v) => v.gate);
	return filtered[0].value;
}
