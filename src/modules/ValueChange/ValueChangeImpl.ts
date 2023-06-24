export default class ValueChange implements IStringValueChange {
	private changed: boolean = false;
	private data: string;
	value: string;

	constructor(data: string) {
		this.data = data;
		this.value = data;
	}
	hasChanged(): boolean {
		return this.changed;
	}
	/**
	 * sets the changeable value
	 * @param value string
	 */
	setValue(value: string) {
		if (this.data === value) {
			this.changed = false;
		} else {
			this.changed = true;
		}
		this.value = value;
	}
	getValue() {
		return this.value;
	}
	/**
	 * get the initial value of the changeable value
	 * @returns string
	 */
	getData(): string {
		return this.data;
	}
}
