import React from "react";

interface Props {
	children: React.ReactNode;
	className?: string;
}

export default function DefaultFormLabel(props: Props) {
	const { className } = props;
	return (
		<p
			className={
				"text-md font-semibold text-slate-900 mb-1 " + (className ? className : "")
			}
		>
			{props.children}
		</p>
	);
}
