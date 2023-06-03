import React, { useEffect, useState } from "react";

import style from "./Clock.module.css";
import getTime from "./Behavior/getTime";
import { motion } from "framer-motion";
import ScaleOnHover from "@src/Components/interactions/ScaleOnHover/ScaleOnHover";

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
		<ScaleOnHover scaleAmount={1}>
			<div className={style.container + " cursor-pointer"}>
				<p className="fcolor-text-body body fw-bold">
					{clock.hr} : {clock.mn} {clock.sector}
				</p>
			</div>
		</ScaleOnHover>
	);
}

export default Clock;
