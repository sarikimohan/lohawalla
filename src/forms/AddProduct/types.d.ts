namespace AddProduct {
	interface SelectionList {
		id: string;
		name: string;
	}
	interface State {
		companyList: SelectionList[];
		categoryList: SelectionList[];
		itemList: SelectionList[];
		selectedCompany: SelectionList;
		selectedItem: SelectionList;
		selectedCategory: SelectionList;
		
		images: string[]
		
		priceStructure : PriceField[];
		margin: Margin;
		credit: Credit[];
		negotiation: number;
		gst: GSTDetails;
		
		description: string;
		descriptionLabels: DescriptionLabels[];
	}
}