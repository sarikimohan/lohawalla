import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import getRoundedVal, {
	getRoundedNumber,
} from "@src/modules/Utils/getRoundedVal";

export default class CreditCalculator extends StateUtils<
	StateWithLoading<PriceCalculation.State>
> {
	getGSTValue() {
		const taxableValue = this.state.creditCalculator.taxableValue;
		const gst = this.state.calculationData.GST;

		if (gst.type === "percentage") {
			return (
				gst.value +
				"% (" +
				getRoundedVal((gst.value / 100) * taxableValue) +
				")"
			);
		} else return gst.value + "₹";
	}

	setSelectedDate(index: number) {
		this.mutateState((p) => {
			p.creditCalculator.selectedDays = index;
			const _ = p.creditCalculator;
			const selection = p.calculationData.creditMargin[index];

			// update the start and end
			let marginShare = 0,
				negoShare = 0;
			let totalMargin = p.calculationData.margin.cash;
			if (selection.type === "percentage") {
				totalMargin += selection.value;
				marginShare = p.netSum * (totalMargin / 100);
			} else {
				marginShare = p.netSum * (totalMargin / 100) + selection.value;
			}

			negoShare = marginShare * (p.calculationData.negotiation / 100);
			_.startValue = getRoundedNumber(marginShare - negoShare);
			_.endValue = getRoundedNumber(marginShare + negoShare);
			_.currentValue = getRoundedNumber(marginShare);

			// update the margin input
			_.netMarginInput.value = getRoundedVal(marginShare);

			// update the taxable value
			_.taxableValue = p.netSum + marginShare;

			// update the net total
			const GST = p.calculationData.GST;
			let gstShare =
				GST.type === "percentage"
					? (GST.value / 100) * _.taxableValue
					: GST.value + _.taxableValue;

			_.netTotal = getRoundedNumber(gstShare + _.taxableValue);
		});
	}

	setCurrentValue(value: number) {
		this.mutateState((p) => {
			const _ = p.creditCalculator;
			_.currentValue = getRoundedNumber(value);

			// change the net margin input
			_.netMarginInput.value = getRoundedVal(value);

			// change the taxable value
			_.taxableValue = value + p.netSum;

			// change the net total
			const GST = p.calculationData.GST;
			let gstShare =
				GST.type === "percentage"
					? (GST.value / 100) * _.taxableValue
					: GST.value + _.taxableValue;

			_.netTotal = getRoundedNumber(gstShare + _.taxableValue);
		});
	}
	setInputValue(d: string) {
		const verdict = { isValid: true };
		this.mutateState((p) => {
			const _ = p.creditCalculator;
			_.netMarginInput.value = d;
			_.netMarginInput.error = FieldDataService.registerValidator(
				d,
				verdict,
				Validators.validateNull,
				Validators.validateFloat,
				(d) => Validators.max(d, p.creditCalculator.endValue),
				(d) => Validators.min(d, p.creditCalculator.startValue)
			);
			if (verdict.isValid) {
				const value = getRoundedNumber(parseFloat(d));
				_.currentValue = getRoundedNumber(value);
				_.taxableValue = (p.netSum + value);
				const GST = p.calculationData.GST;
				let gstShare =
					GST.type === "percentage"
						? (GST.value / 100) * _.taxableValue
						: GST.value + _.taxableValue;
				_.netTotal = getRoundedNumber(gstShare + _.taxableValue);
			}
		});
	}
}
