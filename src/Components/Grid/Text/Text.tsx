import React from "react";

interface Props {
	children?: React.ReactNode;
	className?: string;
}

export default function Text(props: Props) {
	const { className = "" } = props;
	return (
		<p className={"text-sm font-medium text-slate-500 " + className}>
			{props.children}
		</p>
	);
}
