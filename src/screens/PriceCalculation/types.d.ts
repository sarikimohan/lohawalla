namespace PriceCalculation {
	export interface PriceFields {
		name: string;
		value: number;
		operation: OpType;
		type: PercNum;
		position: number;
	}

	export interface Credits {
		days: number;
		value: number;
	}
	export interface calculationData {
		productName: string;
		companyName: string;
		productImage: string;
		priceStructureUnit: string;
		priceField: PriceFields[];
		margin: {
			cash: number;
			online: number;
		};
		negotiation: number;
		creditMargin: Credits[];
		GST: {
			type: string;
			value: number;
		};
	}
	interface State {
		netSum: number;
		renderPriceList: {name: string, value: string}[];
		calculationData: calculationData;
		cashCalculator: {
			startValue: number;
			endValue: number;
			currentValue: number;
			netMarginInput: FieldData;
			taxableValue: number;
			netTotal: number;
		};
		creditCalculator: {
			selectedDays: number;
			startValue: number;
			endValue: number;
			currentValue: number;
			netMarginInput: FieldData;
			taxableValue: number;
			netTotal: number;
		};
		onlineCalculator: {
			marginValue: number;
			taxableValue: number;
			netTotal: number;
		};
	}
}
