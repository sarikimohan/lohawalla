interface PriceField {
	name: string;
	type: 'numeric'|'percentage';
	operation: 'subtract'|'add';
	value: number;
	fixed: boolean;
}