import React from "react";

interface ScreenContainerProps {
	children: React.ReactNode;
	containerProps?: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
}

function ScreenContainer(props: ScreenContainerProps) {
	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				overflow: 'hidden',
				...props.containerProps?.style,
			}}
			{...props.containerProps}
		>
			{props.children}
		</div>
	);
}

export default ScreenContainer;
