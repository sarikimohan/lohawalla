type StringChangeStatus = "initial" | "modified";

interface IStringValueChange {
	value: string;
	// constructor(initial: T): ValueChange<T>;
	hasChanged(): boolean;
	setValue(data: string): void;
	getValue(): string;
	getData(): string;
}
