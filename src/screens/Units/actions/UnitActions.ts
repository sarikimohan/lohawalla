import StateUtils, { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";

export default class UnitActions
	extends ServerStateUtils<Unit.State>
	implements Unit.Actions
{
  saveChanges() {
    throw new Error("Method not implemented.");
  }
  fetchData() {
    throw new Error("Method not implemented.");
  }


  toggleFormVisibility() {
    throw new Error("Method not implemented.");
  }
	setQuery(d: string) {
		this.mutateState((p) => {
			p.query = d;
		});
	}
}
