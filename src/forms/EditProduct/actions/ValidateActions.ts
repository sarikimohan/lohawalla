import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import { Field } from "formik";

export default class ValidateActions extends StateUtils<EditProduct.State> {
	validateAddDescription() {
		const verdict = { isValid: true };
		const key = this.state.descriptionEntry.key;
		const value = this.state.descriptionEntry.value;

		key.value = key.value.trim();
		value.value = value.value.trim();

		key.error = FieldDataService.registerValidator(
			key.value,
			verdict,
			Validators.validateNull,
			(d) => {
				for (let dl of this.state.descriptionLabels) {
					if (dl.key === d) return d + " already exists";
				}
			}
		);
		key.isValid = !key.error;

		value.error = FieldDataService.registerValidator(
			value.value,
			verdict,
			Validators.validateNull
		);
		value.isValid = !value.isValid;

		this.mutateState((p) => {
			p.descriptionEntry = { key, value };
		});

		return verdict.isValid;
	}

	validatePriceStructure() {
		const verdict = { isValid: true };

		this.mutateState((p) => {
			for (let i = 0; i < p.priceStructure.length; ++i) {
				const val = p.priceStructure[i];

				if (val.value.hasChanged) {
					val.value.error = FieldDataService.registerValidator(
						val.value.value,
						verdict,
						Validators.validateNull,
						Validators.validateFloat,
						(d) => {
							if (val.type === "percentage") {
								return Validators.max(d, 100);
							}
						},
						(d) => {
							if (val.type === "percentage") {
								return Validators.min(d, -100);
							}
						}
					);
				}
			}
		});

		return verdict.isValid;
	}

	validateGST() {
		const verdict = { isValid: true };
		const data = this.state.gst.value;

		data.error = FieldDataService.registerValidator(
			data.value,
			verdict,
			Validators.validateNull,
			Validators.validateFloat,
			(d) => Validators.min(d, 0),
			(d) => {
				if (this.state.gst.type === "percentage") return Validators.max(d, 100);
			}
		);

		this.mutateState((p) => {
			p.gst.value = data;
		});

		return verdict.isValid;
	}

	validateDescription() {
		const verdict = { isValid: true };

		this.mutateState((p) => {
			p.description.error = FieldDataService.registerValidator(
				p.description.value,
				verdict,
				Validators.validateNull
			);
		});

		return verdict.isValid;
	}

	validateDescriptionLabels() {
		const verdict = { isValid: true };

		this.mutateState((p) => {
			for (let i = 0; i < p.descriptionLabels.length; ++i) {
				const dl = p.descriptionLabels[i];
				dl.value.error = FieldDataService.registerValidator(
					dl.value.value,
					verdict,
					Validators.validateNull
				);
				p.descriptionLabels[i] = dl;
			}
		});

		return verdict.isValid;
	}

	validateFirstForm() {
		const v = [
			this.validatePriceStructure(),
			this.validateGST(),
			this.validateDescription(),
			this.validateDescriptionLabels(),
		];
		return v.reduce((a, c) => a && c, true);
	}
}
