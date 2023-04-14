import React, { useEffect, useState } from "react";

import style from "./Clock.module.css";
import getTime from "./Behavior/getTime";

interface ClockState {
	hr: string;
	mn: string;
	sc: string;
	sector: "am" | "pm";
}

function Clock() {
	const [clock, setClock] = useState<ClockState>(getTime());

	useEffect(() => {
		setInterval(() => {
			setClock(getTime());
		}, 1000);
	}, []);

	return (
		<div className={style.container}>
			<p className="fcolor-text-body body fw-bold">
				{clock.hr} : {clock.mn} {clock.sector}
			</p>
		</div>
	);
}

export default Clock;
