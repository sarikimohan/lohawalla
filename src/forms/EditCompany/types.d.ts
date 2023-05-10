namespace EditCompany {
	interface State {
		companyName: FieldData;
		description: FieldData;

		images: string[];
		addedImages: string[];
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
