import React from "react";
import LoadingRow from "../LoadingRow/LoadingRow";
import EmptyRow from "../EmptyRow/EmptyRow";

interface Props {
	asyncState?: AsyncState;
	isEmpty?: boolean;
	children?: React.ReactNode;
	colSpan: number;
}

export default function RowStat(props: Props) {
	if (props.asyncState && props.asyncState.status === "initialized")
		return <LoadingRow colSpan={props.colSpan} />;
	if (props.isEmpty === true) return <EmptyRow colSpan={props.colSpan} />;
	return <>{props.children}</>;
}
