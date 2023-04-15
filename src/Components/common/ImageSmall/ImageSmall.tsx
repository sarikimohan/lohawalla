import { motion } from "framer-motion";
import React from "react";
import style from "./ImageSmall.module.css";

export default function ImageSmall(props: {
	index: number;
	src: string;
	currentSelected: number;
	setSelected: () => void;
	sideLength?: number;
}) {
	const s =
		props.currentSelected === props.index ? { opacity: 1 } : { opacity: 0.5 };
	console.log(props.sideLength);
	return (
		<motion.div
			className={style.imageSmallContainer}
			whileHover={{ scale: 1.1 }}
			animate={s}
			onClick={props.setSelected}
			style={{
				width: props.sideLength,
				height: props.sideLength,
			}}
		>
			<div className={style.inactiveMask}></div>
			<img src={props.src} alt="image" className={style.imageSmall} />
		</motion.div>
	);
}
