import React from "react";
import style from "./Header.module.css";

interface Props {
	first: string;
	second: string;
}

export default function Header(props: Props) {
	return (
		<div className={style.header + " w-100 crow"}>
			<div>
				<p className="body fw-bold fcolor-text-body">{props.first}</p>
			</div>
			<div>
				<p className="body fw-bold fcolor-text-body">{props.second}</p>
			</div>
		</div>
	);
}
