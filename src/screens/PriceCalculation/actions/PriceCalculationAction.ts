import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import getPriceData from "../fetch/services/getPriceData";
import getRoundedVal, {
	getRoundedNumber,
} from "@src/modules/Utils/getRoundedVal";

function getValForOperation(a: number, operation: OpType) {
	if (operation === "subtract") return -a;
	return a;
}

export default class PriceCalculationAction extends ServerStateUtils<
	StateWithLoading<PriceCalculation.State>
> {
	private getPriceList(data: PriceCalculation.PriceFields[]) {
		const getSign = (value: number, operation: OpType) => {
			if (
				(operation === "subtract" && value > 0) ||
				(operation === "add" && value < 0)
			)
				return "-";
			else {
				return "+";
			}
		};

		const res: { name: string; value: string }[] = [];
		let total = 0;
		for (let i of data) {
			const label =
				getSign(i.value, i.operation) + Math.abs(i.value).toFixed(1);
			if (i.type === "numeric") {
				total += getValForOperation(i.value, i.operation);
				res.push({
					name: i.name,
					value: label + `₹`,
				});
			}
		}
		for (let i of data) {
			if (i.type === "percentage") {
				res.push({
					name: i.name,
					value: `${getSign(i.value, i.operation)} ${getRoundedVal(
						(Math.abs(i.value) / 100) * total
					)} ₹ (${Math.abs(i.value).toFixed(1)}%)`,
				});
			}
		}

		return res;
	}
	getNumTotal() {
		let total = 0;
		this.state.calculationData.priceField.forEach((v, i) => {
			if (v.type === "numeric") {
				if (v.operation === "add") {
					total += v.value;
				} else {
					total -= v.value;
				}
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
				if (v.operation === "add") {
					total += v.value;
				} else {
					total -= v.value;
				}
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

	setCalculator(id: number) {
		this.mutateState((p) => {
			p.selectedCalculator = id;
		});
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
				if (data.creditMargin.length !== 0) {
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
				}

				// setting the third value
				const online = p.onlineCalculator;
				online.marginValue = getRoundedNumber(
					p.netSum * (p.calculationData.margin.online / 100)
				);
				online.taxableValue = p.netSum + online.marginValue;
				if (data.GST.type === "numeric") {
					online.netTotal = getRoundedNumber(
						data.GST.value + online.taxableValue
					);
					online.gst = data.GST.value + "₹";
				} else {
					online.netTotal = getRoundedNumber(
						online.taxableValue + (data.GST.value / 100) * online.taxableValue
					);
					online.gst =
						data.GST.value +
						"% (" +
						getRoundedVal((data.GST.value / 100) * online.taxableValue) +
						")";
				}
			});
		}
	}
}
