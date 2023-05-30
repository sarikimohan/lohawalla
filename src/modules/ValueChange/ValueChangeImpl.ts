export default class ValueChange<T> implements IValueChange<T> {
	value: ChangeMonitor<{ data: T }>;

	constructor(initial: T) {
		this.value = { data: initial, changeStatus: "initial" };
	}

	setModified(): void {
		this.value.changeStatus = "modified";
	}

	setChangeStatus(status: ChangeStatus) {
		this.value.changeStatus = status;
	}

	hasChanged() {
		return this.value.changeStatus === "modified";
	}

	setValue(data: T) {
		this.value.data = data;
		return this.value.data;
	}

	getValue() {
		return this.value.data;
	}
}
