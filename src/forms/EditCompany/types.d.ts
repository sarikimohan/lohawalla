namespace EditCompany {
	interface State {
		companyName: string;
		description: string;

		images: string[];
		
		imageFiles: File[];

		priceStructure: (PriceField & {
			modifyStatus: ModifyStatus;
			_id: string;
		})[];

		tempPriceStructure: PriceField[];

		descriptionLabels: (DescriptionLabels & { _id: string })[];

		loading: {
			saveImage: AsyncState;
			saveData: AsyncState;
		};
	}
}
