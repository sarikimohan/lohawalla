import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import createUnit from "../fetch/services/createUnit";
import checkNameUnique from "../fetch/services/checkNameUnique";

export default class AddUnitActions extends ServerStateUtils<
	StateWithLoading<AddUnit.State>
> {
	setName(d: string) {
		this.mutateState((p) => {
			p.unitName = d;
		});
	}
	setWeight(d: string) {
		this.mutateState((p) => {
			p.unitWeight = d;
		});
	}
	async save() {
		const res = this.handleAsync("save", () =>
			createUnit({
				name: this.state.unitName,
				weight:
					this.state.unitWeight === ""
						? null
						: parseFloat(this.state.unitWeight),
			})
		);
	}
	
	filter() {
		
	}
}
