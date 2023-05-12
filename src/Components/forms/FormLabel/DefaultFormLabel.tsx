import React from "react";

interface Props {
	children: React.ReactNode;
	className?: string;
}

export default function DefaultFormLabel(props: Props) {
	return (
		<p
			className={
				"text-md font-semibold text-slate-900 " + props.className
					? props.className
					: ""
			}
		>
			{props.children}
		</p>
	);
}
