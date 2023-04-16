namespace ProductSpecification {
	interface State {
		productName: string;
		companyName: string;
		itemName: string;
		description: string;
		descriptionLabels: DescriptionLabels[];
		priceStructure: PriceField[];
		margin: Margin;
		gst: {key: string, value: string|number};
		images: string[];

		loading: {
			fetch: AsyncState
		}
	}

	interface Actions {
		fetch(id: string);
	}
}
