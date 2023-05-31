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
	getData(): string {
		return this.data;
	}
}
