import React from "react";
import style from "./FilledScrollContainer.module.scss";

interface FilledScrollContainerProps {
	children?: React.ReactNode;
	padding?: number;
	paddingTop?: number;
	paddingBottom?: number;
	paddingLeft?: number;
	paddingRight?: number;
	margin?: number;
	marginTop?: number;
	marginBottom?: number;
	marginLeft?: number;
	marginRight?: number;
}

function FilledScrollContainer({
	children,
	...props
}: FilledScrollContainerProps) {
	return (
		<div className={style.container} style={props}>
			{children}
		</div>
	);
}

export default FilledScrollContainer;
