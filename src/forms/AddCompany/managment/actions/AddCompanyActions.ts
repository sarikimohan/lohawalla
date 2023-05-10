import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class AddCompanyActions extends StateUtils<AddCompany.State> {

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

	setImages(images: File[] | null) {
		this.mutateState(p => {
			p.images = images;
		})
	}
}
