namespace EditCategory {
	type ModifyStatus = "initial" | "modified" | "added" | "deleted";

	interface DescriptionLabels {
		id: string;
		key: string;
		value: string;
	}

	interface State {
		page: number;
		negotiation: string;
		// TODO -- add support for units 
		
		categoryName: string;
		categoryCode: string;
		description: string;
		images: string[];
		
		imageFiles: File[]|null;

		credit: {
			days: number;
			value: string;
			type: PercNum;
			id: string;
		}[];
		creditInput: {
			key: string;
			value: string;
		};

		descriptionLabels: DescriptionLabels[];

		descriptionEntry: {
			key: string;
			value: string;
		};

		loading: {
			saveImages: AsyncState;
			saveData: AsyncState;
		};
	}
}
