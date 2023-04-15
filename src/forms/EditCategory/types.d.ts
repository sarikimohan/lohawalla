namespace EditCategory {
	type ModifyStatus = "initial" | "modified" | "added" | "deleted";

	interface State {
		categoryName: string;
		categoryCode: string;
		description: string;
		images: string[];
		addedImages: string[];
		imageFiles: File[];
		credit: Credit;
		descriptionLabels: (DescriptionLabels & { _id: string })[];

		loading: {
			saveImages: AsyncState;
			saveData: AsyncState;
		};
	}
}
