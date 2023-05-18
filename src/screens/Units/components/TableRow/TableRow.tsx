import React from "react";
import Text from "@src/Components/Grid/Text/Text";
import TableData from "@src/Components/Grid/TableData/TableData";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";

interface Props {
	data: Unit.UnitListItem;
}

export default function TableRow(props: Props) {
	const { data } = props;

	return (
		<tr>
			<TableData>
				<Text>{data.srNo}</Text>
			</TableData>
			<TableData>
				<Text>{data.name}</Text>
			</TableData>
			<TableData>
				{data.weight !== -1 ? (
					<Text>{data.weight}</Text>
				) : (
					<ValidatedEntry
						onChange={function (e: string): void {
							throw new Error("Function not implemented.");
						}}
						value={""}
						placeholder="enter value"
					/>
				)}
			</TableData>
			<TableData>
				<Text>{data.categoryCount}</Text>
			</TableData>
			<TableData>
				<Text>{data.productCount}</Text>
			</TableData>
			<TableData>
				<RotateAndScale>
					<AssetIndex.MinusCircleIcon />
				</RotateAndScale>
			</TableData>
		</tr>
	);
}
