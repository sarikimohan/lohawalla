namespace AddCategory {
	interface State {
		categoryName: string;
		categoryCode: string;
		description: string;
		unit: string;
		images: string[];
		credit: Credit[];
		negotiation: number;
		descriptionLabels: DescriptionLabels[];
		
		loading: {
			saveImage: AsyncState;
			saveData: AsyncState;
		}
	}
}