namespace EditProduct {
	interface State {
		selectedCompany: string;
		selectedCategory: string;
		selectedItem: string;

		images: { link: string; deleted: boolean }[];
		imageFiles: File[];

		description: FieldData;

		priceStructure: (PriceField & { _id: string })[];
	}
}
