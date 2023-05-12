export default class StateUtils<T> {
	protected state: T;
	protected setState: (setter: (newState: T) => T) => void;

	constructor(state: T, setState: (setter: (newState: T) => T) => void) {
		this.state = state;
		this.setState = setState;
	}

	public mutateState(setter: (state: T) => void) {
		this.setState((s) => {
			const newState = { ...s };
			setter(newState);
			return newState;
		});
	}
}

export class ServerStateUtils<
	T extends { loading: Record<string, AsyncState> }
> extends StateUtils<T> {
	public async handleAsync<T = any>(
		name: string,
		fn: () => Promise<T>,
		config?: {
			initializedMessage?: string;
			successMessage?: string;
			errMessage?: string;
		}
	) {
		const conf = config ? config : {};
		const {
			initializedMessage = "initialized",
			successMessage = "successful",
			errMessage = "failed",
		} = conf;

		this.mutateState((p) => {
			p.loading[name] = {
				status: "initialized",
				message: initializedMessage,
			};
		});
		try {
			const val = await fn();
			this.mutateState((p) => {
				p.loading[name] = {
					status: "success",
					message: successMessage,
				};
			});
			return val;
		} catch (err) {
			this.mutateState((p) => {
				p.loading[name] = {
					status: "failed",
					message: errMessage,
				};
			});
		}
	}
}
