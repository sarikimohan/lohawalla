namespace ProductSpecification {
	interface State {
		productName: string;
		companyName: string;
		itemName: string;
		description: string;
		category: {
			name: string;
			_id: string;
		};
		descriptionLabels: {
			key: string;
			value: string;
			position: number;
		}[];
		priceStructure: {
			name: string;
			type: "numeric" | "percentage";
			operation: "subtract" | "add";
			value: number;
			fixed: boolean;
		}[];
		margin: {
			online: number;
			cash: number;
		};
		gst: { key: string; value: string };
		images: string[];

		showDelete: boolean;

		loading: {
			fetch: AsyncState;
			deleteCompanyProduct: AsyncState;
		};
	}

	interface Actions {
		fetch(id: string);
	}
}
