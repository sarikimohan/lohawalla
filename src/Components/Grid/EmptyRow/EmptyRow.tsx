import React from "react";

interface Props {
	colSpan: number;
}

export default function EmptyRow(props: Props) {
	return (
		<tr>
			<td colSpan={props.colSpan} align="center">
				<div className="p-2">
					<p className="text-sm font-bold text-slate-500 capitalize">
						empty :(
					</p>
				</div>
			</td>
		</tr>
	);
}
