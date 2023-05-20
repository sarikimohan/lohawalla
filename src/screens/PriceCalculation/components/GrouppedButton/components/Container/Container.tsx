import React from "react";
import style from "./Container.module.scss";

function Container(p: { children: React.ReactNode }) {
	return (
		<div className={style.container}>
			<div className={style.wrapper}>{p.children}</div>
		</div>
	);
}

export default Container;
