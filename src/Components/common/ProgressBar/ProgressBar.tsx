import { motion } from "framer-motion";
import React from "react";
import style from "./ProgressBar.module.css";
import LoopArray from "@src/modules/Utils/LoopArray";

function ProgressHandle(props: { isActive: boolean; index: number }) {
	const styles = {
		active: {
			bar: {
				background: "var(--fuschia)",
			},
			circle: {
				background: "linear-gradient(180deg, #2A333E 0%, #595E64 95.31%)",
			},
		},
		inActive: {
			bar: {
				background: "#E8E8EC",
			},
			circle: {
				background: "#e8e8ec",
			},
		},
	};

	const { bar, circle } = props.isActive ? styles.active : styles.inActive;

	return (
		<div className={style.handleWrapper} style={{ zIndex: 5 - props.index }}>
			<div className={style.handleContainer}>
				<motion.div className={style.bar} animate={bar}></motion.div>
			</div>
			<motion.div className={style.circle} style={circle}>
				<p className="body fcolor-light">{props.index}</p>
			</motion.div>
		</div>
	);
}

interface ProgressBarProps {
	currentStep: number;
	steps: number;
}

function ProgressBar(props: ProgressBarProps) {
	return (
		<div className={style.container}>
			{LoopArray(props.steps).map((val, index) => (
				<ProgressHandle
					isActive={index + 1 <= props.currentStep}
					index={index + 1}
					key={index}
				/>
			))}
		</div>
	);
}

export default ProgressBar;
