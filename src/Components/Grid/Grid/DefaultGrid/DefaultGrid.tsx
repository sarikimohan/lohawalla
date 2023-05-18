import React from "react";
import Header, { HeaderConfig } from "../../Header/Header";
import { TableRow } from "@mui/material";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";
import RowStat from "../../RowStat/RowStat";

interface Props {
	columns: (string | HeaderConfig)[];
	children?: React.ReactNode;
	rowAsyncState?: AsyncState<any>;
	tableAsyncState?: AsyncState<any>;
	isEmpty?: boolean;
	type?: "auto" | "fixed";
}

export default function DefaultGrid(props: Props) {
	return (
		<LoadingBoundary asyncState={props.tableAsyncState}>
			<table className={`table-${props.type ? props.type : "fixed"} w-full`}>
				<Header columns={props.columns} />
				<tbody>
					<RowStat
						colSpan={props.columns.length}
						isEmpty={props.isEmpty}
						asyncState={props.rowAsyncState}
					>
						{props.children}
					</RowStat>
				</tbody>
			</table>
		</LoadingBoundary>
	);
} 
