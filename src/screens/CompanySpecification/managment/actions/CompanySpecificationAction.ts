import {
	getCompanySpecificationData,
	getProductGridData,
} from "@src/globals/constants/async";
import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";
import fetchSpecData from "../../fetch/services/fetchSpecData";
import fetchListData from "../../fetch/services/fetchListData";

export default class CompanySpecActions extends ServerStateUtils<CompanySpecification.State> {
	async fetch(id: string) {
		const res = await this.handleAsync("fetch", () => fetchSpecData(id));
		if (res) {
			const data = res.data;
			this.mutateState((p) => {
				p.companyName = data.name;
				p.description = data.description;
				p.descriptionLabels = data.descriptionLabels.map((v) => ({
					key: v.key,
					value: v.value,
					position: 0,
				}));
				p.images = data.images;
				p.priceStructure = data.priceStructure;
			});
		}
	}
	async fetchAllCompanyItem(id: string) {
		const res = await this.handleAsync("fetchList", () => fetchListData(id));
		if (res) {
			const data = res.data;
			console.log(data);
			this.mutateState((p) => {
				p.companyList = data;
			});
		}
	}
	filter(): CompanySpecification.CompanyProduct[] {
		const query = this.state.filter.query.toLowerCase().trim();
		if (query === "") return this.state.companyList;
		return this.state.companyList.filter((v) => {
			isPrefix(v.companyProductName.toLowerCase(), query);
		});
	}
	setQuery(query: string): void {
		this.mutateState((p) => {
			p.filter.query = query;
		});
	}
}
