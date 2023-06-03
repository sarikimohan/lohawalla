import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import fetchViewMargin from "../fetch/services/fetchViewMargin";
import saveViewMargin from "../fetch/services/saveViewMargin";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import isPrefix from "@src/modules/Utils/isPrefix";

export class ServerActions extends ServerStateUtils<CategoryViewMargin.State> {
	async fetch(id: string) {
		const res = await this.handleAsync("fetch", () => fetchViewMargin(id));
		if (res) {
			console.log(res);
			this.mutateState((p) => {
				p.data = res.data.map((v) => ({
					srNo: v.srNo,
					itemName: v.itemName,
					itemId: v.itemId,
					marginId: v.marginId,
					cashMargin: { value: v.cashMargin.toFixed(1), hasChanged: false },
					onlineMargin: { value: v.onlineMaring.toFixed(1), hasChanged: false },
				}));
			});
		}
	}

	validateSave() {
		const verdict = { isValid: true };
		this.mutateState((p) => {
			p.data.forEach((v, i) => {
				const cashData = v.cashMargin;
				const onlineData = v.onlineMargin;

				const validator = (data: string) =>
					FieldDataService.registerValidator(
						data,
						verdict,
						Validators.validateNull,
						Validators.validateFloat,
						(d) => Validators.max(d, 100),
						(d) => Validators.min(d, 0)
					);

				cashData.error = validator(cashData.value);
				onlineData.error = validator(onlineData.value);

				p.data[i].cashMargin = cashData;
				p.data[i].onlineMargin = onlineData;
			});
		});
		return verdict.isValid;
	}

	async save(by: NameIdPair) {
		const d: {
			marginId: string;
			cashValue?: number;
			onlineValue?: number;
		}[] = [];
		this.state.data.forEach((v, i) => {
			d.push({
				marginId: v.marginId,
				cashValue: v.cashMargin.hasChanged
					? parseFloat(v.cashMargin.value)
					: undefined,
				onlineValue: v.onlineMargin.hasChanged
					? parseFloat(v.onlineMargin.value)
					: undefined,
			});
		});

		const res = await this.handleAsync("save", () =>
			saveViewMargin({
				list: d,
				by,
			})
		);
	}

	filter() {
		const query = this.state.query.trim();

		if (query.length === 0) return this.state.data;

		return this.state.data.filter((v) => isPrefix(v.itemName.name, query));
	}
}
