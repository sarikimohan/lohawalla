namespace CategoryViewMargin {
	interface ItemMarginGridData {
		_id: string;
		srNo: number;
		itemName: {
			name: string;
			imageURL: string;
		};
		itemId: string;
		marginId: string;
		cashMargin: FieldData & { hasChanged: boolean };
		onlineMargin: FieldData & { hasChanged: boolean };
	}
	interface State {
		data: ItemMarginGridData[];
		loading: Record<string, AsyncState>
	}
}
