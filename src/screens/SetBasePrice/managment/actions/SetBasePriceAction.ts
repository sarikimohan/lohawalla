import { getAllCompaniesWithBaseRate } from "@src/globals/constants/async";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";

export default class SetBasePriceAction
	extends StateUtils<SetBasePrice.State>
	implements SetBasePrice.Actions
{
	fetch() {
		this.mutateState((p) => (p.loading.fetch.status = "initialized"));
		try {
			(async () => {
				const list = await getAllCompaniesWithBaseRate();
				this.mutateState((p) => {
					p.setList = list;
					p.loading.fetch.status = "success";
				});
			})();
		} catch (err) {
			this.mutateState(
				(p) =>
					(p.loading.fetch = {
						status: "failed",
						message: "some error occured",
					})
			);
		}
	}
	setQuery(query: string) {
		this.mutateState((p) => {
			p.filter.query = query;
		});
	}
	filter(): SetBasePrice.SetCompanyBasePrice[] {
		const query = this.state.filter.query.toLowerCase().trim();
		return this.state.setList.filter((v) =>
			isPrefix(v.companyName.name, query)
		);
	}
}
