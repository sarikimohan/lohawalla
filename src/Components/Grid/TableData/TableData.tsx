import React from "react";

interface Props {
	children?: React.ReactNode;
}

export default function TableData(props: Props) {
	return (
		<td align="center" className="py-3 border-b">
			{props.children}
		</td>
	);
}
