import StateUtils from "@src/modules/StateManagement/Core/StateUtils";

export default class FormActions extends StateUtils<AddCompany.State> {
	setCompany(data: string) {
		this.mutateState((p) => {
			p.firstForm.companyName.value = data;
		});
	}
	setDescription(data: string) {
		this.mutateState((p) => {
			p.firstForm.description.value = data;
		});
	}

	validateFirstForm() {
		const error: {
			name?: string;
			description?: string;
		} = {
			name: undefined,
			description: undefined,
		};
		const reqErr = "is required";

		const { companyName, description } = this.state.firstForm;
		if (companyName.value === "") {
			error.name = reqErr;
		}

		if (description.value === "") {
			description.error = reqErr;
		}

		this.mutateState((p) => {
			p.firstForm.companyName.error = error.name;
			p.firstForm.description.error = error.description;

			p.firstForm.companyName.isValid = !error.name;
			p.firstForm.description.isValid = !error.description;
		});
	}
}
