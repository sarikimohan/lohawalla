import React from "react";
import Text from "@src/Components/Grid/Text/Text";
import TableData from "@src/Components/Grid/TableData/TableData";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import ValidatedEntry from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import style from './TableRow.module.css'

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
					// <ValidatedEntry
					// 	onChange={function (e: string): void {
					// 		throw new Error("Function not implemented.");
					// 	}}
					// 	value={""}
					// 	placeHolder="enter value"
					// />
					<Text>custom</Text>
				)}
			</TableData>
			<TableData>
				<Text>{data.categoryCount}</Text>
			</TableData>
			{/* <TableData>
				<Text>{data.productCount}</Text>
			</TableData> */}
			{/* <TableData>
				<RotateAndScale>
					<svg
						width="22"
						height="22"
						viewBox="0 0 22 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={style.circleMinus}
					>
						<path
							d="M7 11H15M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
							stroke="black"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</RotateAndScale>
			</TableData> */}
		</tr>
	);
}
