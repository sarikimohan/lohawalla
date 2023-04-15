namespace ItemSpecification {
	interface CompanyProduct {
		_id: string;
		srNo: number;
		company: {
			name: string;
			imageURL: string;
		};
		companyProductName: string;
	}
	
	interface ItemSpecification {
		itemName: string;
		categoryName: string;
		description: string;
		descriptionLabels: DescriptionLabels[];
		margin: Margin;
		gst: GSTDetails;
		companyProductList: CompanyProduct[];
		filter: Filter; 
	}
}
