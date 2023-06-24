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
		categoryName: IStringValueChange;
		categoryCode: IStringValueChange;
		description: string;
		images: {link: string, deleted: boolean}[];

		imageFiles: File[] | null;

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
		loading: Record<string, AsyncState>;
	}
}
