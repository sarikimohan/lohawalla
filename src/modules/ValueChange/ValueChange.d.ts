type ChangeStatus = "initial" | "modified" | "deleted" | "added";
type ChangeMonitor<T extends {}> = T & { changeStatus: ChangeStatus };
interface IValueChange<T> {
	value: ChangeMonitor<{ data: T }>;
	// constructor(initial: T): ValueChange<T>;
	setChangeStatus(status: ChangeStatus): void;
	hasChanged(): boolean;
	setValue(data: T): T;
	getValue(): T;
	setModified(): void;
}
