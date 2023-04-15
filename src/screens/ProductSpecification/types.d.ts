namespace ProductSpecification {
	interface State {
		productName: string;
		companyName: string;
		itemName: string;
		description: string;
		descriptionLabels: DescriptionLabels[];
		priceStructure: PriceField[];
		margin: Margin;
		gst: GSTDetails;
		images: string[];
	}
}
