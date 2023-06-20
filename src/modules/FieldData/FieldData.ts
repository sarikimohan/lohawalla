export class FieldDataService {
	static getDefaultField(initial: string = "") {
		const d: FieldData = {
			value: initial,
			isValid: undefined,
			error: undefined,
		};
		return d;
	}

	static registerValidator(
		data: string,
		verdict: { isValid: boolean },
		...validators: ((data: string) => undefined | string)[]
	) {
		for (let validator of validators) {
			const result = validator(data);
			if (result) {
				verdict.isValid = false;
				return result;
			}
		}
	}

	static clubValidators(...validators: ((d: string) => string | undefined)[]) {
		return (d: string) => {
			for (let validator of validators) {
				const verdict = validator(d);
				if (verdict) return verdict;
			}
			return;
		};
	}
}

export class Validators {
	static validateInt(data: string) {
		const transformed = parseInt(data);
		if (Number.isNaN(transformed)) return "not an integer";
		for (let ch of data) {
			if (ch === ".") return "required only integer values";
		}
	}
	static validateFloat(data: string) {
		const transformed = parseFloat(data);
		if (Number.isNaN(transformed)) return "not a valid number";
	}
	static validateNull(data: string) {
		if (data.trim().length === 0) return "required";
	}

	static min(data: string, value: number) {
		const val = parseFloat(data);
		if (Number.isNaN(val)) return "not a number";
		if (val < value) {
			return "value cannot be less than " + value;
		}
	}
	static max(data: string, value: number) {
		const val = parseFloat(data);
		if (Number.isNaN(val)) return "not a number";
		if (val > value) {
			return "value cannot be more than " + value;
		}
	}
}
