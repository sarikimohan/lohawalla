import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import fetchCatNoItems from "../fetch/services/fetchCatNoItems";
import isPrefix from "@src/modules/Utils/isPrefix";

export default class ServerActions extends ServerStateUtils<
	StateWithLoading<CategoryNumberOfItems.State>
> {
	async fetch(id: string) {
		const res = await this.handleAsync("fetch", () => fetchCatNoItems(id));
		if (res) {
			this.mutateState((p) => {
				p.grid = res.data;
			});
		}
	}

	showForm(
		id: string,
		inc: CategoryNumberOfItems.Entity[],
		atc: CategoryNumberOfItems.Entity | null
	) {
		this.mutateState((p) => {
			p.showForm = {
				status: true,
				id,
				inActiveCompanies: inc,
				activeCompany: atc,
			};
		});
	}

	closeForm() {
		this.mutateState((p) => {
			p.showForm = {
				status: false,
				id: "",
				inActiveCompanies: [],
				activeCompany: null,
			};
		});
	}
	refresh() {
		this.mutateState((p) => {
			p.refresh = !p.refresh;
		});
	}

	filter() {
		const query = this.state.query.trim().toLowerCase();
		if (query.length === 0) {
			return this.state.grid;
		}
		return this.state.grid.filter((v) =>
			isPrefix(v.itemName.name.trim().toLowerCase(), query)
		);
	}
}
