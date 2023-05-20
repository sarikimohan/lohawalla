export default function getRoundedVal(val: number) {
	if (Number.isInteger(val)) return val.toFixed(2);
	else return (Math.round(val * 10) / 10).toFixed(2);
}
