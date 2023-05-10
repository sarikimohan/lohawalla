export class FieldDataService {
	static getDefaultField() {
		const d: FieldData = {
			value: "",
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
}

export class Validators {
	static validateInt(data: string) {
		let verdict = true;
		if (data.length === 0) verdict = false;
		if (/^[0-9]*$/.test(data) === false) verdict = false;
		if (data[0] === "0") verdict = false;
		if (verdict === false) return "not an integer";
	}
	static validateFloat(data: string) {
		let verdict = true;
		if (data.length === 0) verdict = false;
		const split = data.split(".");
		if (split.length > 2) verdict = false;
		if (split[1].length === 0) verdict = false;
		if (Validators.validateInt(split[0]) || Validators.validateInt(split[1]))
			verdict = false;
		if (verdict === false) {
			return "not a valid number";
		}
	}
	static validateNull(data: string) {
		if (data.length === 0) return "required";
	}
}
