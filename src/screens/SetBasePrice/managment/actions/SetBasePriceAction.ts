import { getAllCompaniesWithBaseRate } from "@src/globals/constants/async";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import isPrefix from "@src/modules/Utils/isPrefix";

export default class SetBasePriceAction
	extends StateUtils<SetBasePrice.State>
	implements SetBasePrice.Actions
{
	fetch() {}
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

	validateSubmit() {
		const verdict = { isValid: true };
		this.mutateState((p) => {
			p.setList.forEach((v, i) => {
				const data = v.cost;
				data.error = FieldDataService.registerValidator(
					data.value,
					verdict,
					Validators.validateNull,
					Validators.validateFloat,
					(d) => Validators.min(d, 1)
				);
			});
		});
		
		return verdict.isValid;
	}
}
