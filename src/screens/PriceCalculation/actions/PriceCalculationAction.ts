import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import getPriceData from "../fetch/services/getPriceData";
import getRoundedVal from "@src/modules/Utils/getRoundedVal";

function getValForOperation(a: number, operation: OpType) {
	if (operation === "subtract") return -a;
	return a;
}

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
	async fetch(id: string) {
		// fetch
		const res = await this.handleAsync("fetchData", () => getPriceData(id));
		if (res) {
			const list = this.getPriceList(res.data.priceField);
			console.log(res.data);
			this.mutateState((p) => {
				p.calculationData = res.data;
				p.renderPriceList = list;
			});
		}
		// sort and set in the list
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
}
