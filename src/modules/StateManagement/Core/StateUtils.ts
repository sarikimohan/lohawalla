export default class StateUtils<T> {
	protected state: T;
	protected setState: (setter: (newState: T) => T) => void;

	constructor(state: T, setState: (setter: (newState: T) => T) => void) {
		this.state = state;
		this.setState = setState;
	}

	public mutateState(setter: (state: T) => void) {

		this.setState((s) => {
      const newState = {...s};
      setter(newState);
      return newState;
    });
	}
}