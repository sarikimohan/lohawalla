import React from "react";
import style from "./InfoCard.module.css";

interface InfoCardProps {
	icon?: React.ReactNode;
	color?: string;
	heading?: string;
	subHeading?: string;
}

function InfoCard(props: InfoCardProps) {
	const {
		icon = <></>,
		color = "#ddd",
		heading = "heading",
		subHeading = "subHeading",
	} = props;
	return (
		<div className={style.container}>
			<div className={style.iconBox + " mr-2"} style={{ background: color }}>
				{icon}
			</div>
			<div>
				<p className="body fcolor-onyx fw-medium">{heading}</p>
				<p className="small fcolor-text-body fw-medium">{subHeading}</p>
			</div>
		</div>
	);
}

export default InfoCard;
