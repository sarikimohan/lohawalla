import { CircularProgress } from "@mui/material";
import React from "react";

interface Props {
	colSpan: number;
}

export default function LoadingRow(props: Props) {
	return (
		<tr>
			<td colSpan={props.colSpan} align="center">
				<div className="p-2">
					<CircularProgress size={24} />
				</div>
			</td>
		</tr>
	);
}
