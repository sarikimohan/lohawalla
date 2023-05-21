import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import getRoundedVal from "@src/modules/Utils/getRoundedVal";

export default class CashCalculator extends StateUtils<
	StateWithLoading<PriceCalculation.State>
> {
	//* cash calculator
	getSliderRange(): { start: number; end: number } {
		return {
			start: this.state.cashCalculator.startValue,
			end: this.state.cashCalculator.endValue,
		};
	}
	getCurrentSliderValue() {
		return this.state.cashCalculator.currentValue;
	}
	getTaxableValue() {
		return this.state.cashCalculator.taxableValue;
	}
	getGSTValue() {
		const taxable = this.state.cashCalculator.taxableValue;
		const gst = this.state.calculationData.GST;
		if (gst.type === "percentage") {
			return (
				gst.value +
				"% " +
				getRoundedVal(parseFloat(taxable) * (gst.value / 100))
			);
		} else return gst.value.toFixed(2) + "%";
	}
	getNetTotal() {
		return this.state.cashCalculator.netTotal;
	}
	getInput() {
		return this.state.cashCalculator.netMarginInput;
	}
	setNetMargin(d: string) {
		const verdict = { isValid: true };
		this.mutateState((p) => {
			p.cashCalculator.netMarginInput.value = d;

			const data = p.cashCalculator.netMarginInput;
			data.error = FieldDataService.registerValidator(
				data.value,
				verdict,
				Validators.validateNull,
				Validators.validateFloat,
				(d) => Validators.max(d, p.cashCalculator.endValue),
				(d) => Validators.min(d, p.cashCalculator.startValue)
			);

			data.isValid = !data.error;

			if (data.isValid) {
				const current = parseFloat(data.value);
				const netSum = p.netSum;
				const taxableValue = netSum + parseFloat(data.value);
				const gst =
					p.calculationData.GST.type === "percentage"
						? taxableValue * (p.calculationData.GST.value / 100)
						: -1;
				const netTotal =
					taxableValue + (gst === -1 ? p.calculationData.GST.value : gst);

				// setting the states
				p.cashCalculator.currentValue = current;
				p.cashCalculator.netTotal = netTotal;
				p.cashCalculator.taxableValue = getRoundedVal(taxableValue);
			}
		});
	}
	setCurrentSliderValue(d: number) {
		this.mutateState((p) => {
			const cashCal = p.cashCalculator;
			cashCal.currentValue = d;

			// set the input
			cashCal.netMarginInput.value = d.toFixed(2);
			// change the taxable value
			const netSum = p.netSum;
			const taxableValue = netSum + d;
			cashCal.taxableValue = getRoundedVal(netSum + d);

			// change the net total
			const gst =
				p.calculationData.GST.type === "percentage"
					? taxableValue * (p.calculationData.GST.value / 100)
					: -1;
			const netTotal =
				taxableValue + (gst === -1 ? p.calculationData.GST.value : gst);
			cashCal.netTotal = netTotal;
		});
	}
}
