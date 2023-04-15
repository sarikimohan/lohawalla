namespace AddItem {
	interface State {
		itemName: string;
		itemHSNCode: string;
		itemCode: string;
		images: string[];
		margin: Margin;
		description: string;
		descriptionLabels: DescriptionLabels[];

		loading: {
			imageUpload: AsyncState;
			saveData: AsyncState;
		};
	}
}
