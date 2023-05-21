import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import getPriceData from "../fetch/services/getPriceData";
import getRoundedVal, {
	getRoundedNumber,
} from "@src/modules/Utils/getRoundedVal";

function getValForOperation(a: number, operation: OpType) {
	if (operation === "subtract") return -a;
	return a;
}

//* TODO set the initial state in server inflation of state
export default class PriceCalculationAction extends ServerStateUtils<
	StateWithLoading<PriceCalculation.State>
> {
	private getPriceList(data: PriceCalculation.PriceFields[]) {
		const res: { name: string; value: string }[] = [];
		let total = 0;
		for (let i of data) {
			if (i.type === "numeric") {
				total += getValForOperation(i.value, i.operation);
				res.push({
					name: i.name,
					value: `${i.operation === "add" ? "+" : "-"} ${i.value.toFixed(1)} ₹`,
				});
			}
		}
		for (let i of data) {
			if (i.type === "percentage") {
				res.push({
					name: i.name,
					value: `${i.operation === "add" ? "+" : "-"} ${getRoundedVal(
						(i.value / 100) * total
					)} ₹ (${i.value}%)`,
				});
			}
		}

		return res;
	}
	getNumTotal() {
		let total = 0;
		this.state.calculationData.priceField.forEach((v, i) => {
			if (v.type === "numeric") {
				total += v.value;
			}
		});
		return total;
	}
	getPercTotal(numTotal: number) {
		let total = 0;
		this.state.calculationData.priceField.forEach((v, i) => {
			if (v.type === "percentage") {
				total += getValForOperation((v.value / 100) * numTotal, v.operation);
			}
		});
		return total;
	}
	getTotal() {
		const numTotal = this.getNumTotal();
		const percTotal = this.getPercTotal(numTotal);
		return numTotal + percTotal;
	}

	private _getNumTotal(data: PriceCalculation.PriceFields[]) {
		let total = 0;
		data.forEach((v, i) => {
			if (v.type === "numeric") {
				total += v.value;
			}
		});
		return total;
	}
	private _getPercTotal(
		numTotal: number,
		data: PriceCalculation.PriceFields[]
	) {
		let total = 0;
		data.forEach((v, i) => {
			if (v.type === "percentage") {
				total += getValForOperation((v.value / 100) * numTotal, v.operation);
			}
		});
		return total;
	}

	async fetch(id: string) {
		const res = await this.handleAsync("fetchData", () => getPriceData(id), {
			errMessage:
				"there might be some problem with the server, please check your internet connection or try again",
		});
		if (res) {
			const data = res.data;
			const list = this.getPriceList(data.priceField);
			this.mutateState((p) => {
				p.calculationData = res.data;
				p.renderPriceList = list;

				// setting the first value;
				const numTotal = this._getNumTotal(res.data.priceField);
				const percTotal = this._getPercTotal(numTotal, res.data.priceField);
				const total = numTotal + percTotal;
				p.netSum = total;
				const marginValue = total * (data.margin.cash / 100);
				const negotiationShare = (marginValue * data.negotiation) / 100;
				p.cashCalculator.startValue = marginValue - negotiationShare;
				p.cashCalculator.endValue = marginValue + negotiationShare;
				p.cashCalculator.currentValue = marginValue;
				p.cashCalculator.netMarginInput.value = marginValue.toFixed(2);
				const taxableValue = total + marginValue;
				p.cashCalculator.taxableValue = taxableValue.toFixed(2);

				if (data.GST.type === "percentage") {
					p.cashCalculator.netTotal =
						taxableValue + (taxableValue * data.GST.value) / 100;
				} else {
					p.cashCalculator.netTotal = taxableValue + data.GST.value;
				}

				// setting the second value
				const _ = p.creditCalculator;
				_.selectedDays = 0;

				let marginShare = total * (data.margin.cash / 100);
				const selectedMargin = data.creditMargin[0];
				if (selectedMargin.type === "percentage") {
					marginShare += (total * selectedMargin.value) / 100;
				} else marginShare += selectedMargin.value;
				const negoShare = marginShare * (data.negotiation / 100);

				_.currentValue = getRoundedNumber(marginShare);
				_.startValue = getRoundedNumber(marginShare - negoShare);
				_.endValue = getRoundedNumber(marginShare + negoShare);

				_.netMarginInput.value = marginShare.toFixed(2);

				_.taxableValue = marginShare + total;

				if (data.GST.type === "numeric") {
					_.netTotal = getRoundedNumber(data.GST.value + _.taxableValue);
				} else {
					_.netTotal = getRoundedNumber(
						_.taxableValue + (data.GST.value / 100) * _.taxableValue
					);
				}
			});
		}
	}
}
