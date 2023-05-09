import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class AddCompanyActions extends StateUtils<AddCompany.State> {
	setFirstForm(data: AddCompany.FirstFormData) {
		this.mutateState((p) => {
			p.firstForm = data;
		});
	}

	setPriceFields(data: PriceField[]) {
		this.mutateState((p) => {
			p.priceStructure = data;
		});
	}

	setDescription(data: DescriptionLabels[]) {
		this.mutateState((p) => {
			p.descriptionLabels = data;
		});
	}

	/**
	 * this section focuses on the navigation
	 */
	navFront() {
		if (this.state.page === 2) return;
		this.mutateState((p) => {
			p.page++;
		});
	}
	navBack() {
		if (this.state.page === 0) return;
		this.mutateState((p) => {
			p.page--;
		});
	}
}
