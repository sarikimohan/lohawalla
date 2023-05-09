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
		let isValid = true;
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
			isValid = false;
		}

		if (description.value === "") {
			error.description = reqErr;
			isValid = false;
		}

		this.mutateState((p) => {
			p.firstForm.companyName.error = error.name;
			p.firstForm.description.error = error.description;

			p.firstForm.companyName.isValid = !error.name;
			p.firstForm.description.isValid = !error.description;
		});

		return isValid;
	}
}
