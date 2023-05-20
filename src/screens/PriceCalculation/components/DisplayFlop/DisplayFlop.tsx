import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import style from "./DisplayFlop.module.scss";

type Interaction = "active" | "hover" | "default";

const styleConfig = {
	active: {
		buttonContainer: {
			backgroundColor: "var(--iris)",
			boxShadow: "0px 3px 4px 0px #00000040",
		},
		buttonText: {
			color: "#fff",
		},
		labelContainer: { opacity: 1 },
	},
	hover: {
		buttonContainer: {
			boxShadow: "0px 3px 4px 0px #00000040",
		},
		buttonText: {},
		labelContainer: { opacity: 0 },
	},
	default: {
		buttonContainer: {},
		buttonText: { color: "var(--text-subtitle)" },
		labelContainer: { opacity: 0 },
	},
};

interface DisplayFlopProps {
	buttonText?: string;
	labelText?: string;
	onClick?: () => void;
	isActive?: boolean;
}

function DisplayFlop(p: DisplayFlopProps) {
	const ref = React.createRef<HTMLDivElement>();

	const [interaction, setInteraction] = useState<Interaction>("default");

	useEffect(() => {
		const e = ref.current as HTMLDivElement;
		if (e === null) return () => {};
		const setHover = () => {
			setInteraction((p) => (p === "active" ? "active" : "hover"));
		};
		const setDefault = () => {
			setInteraction((p) => (p === "active" ? "active" : "default"));
		};
		const setActive = () => {
			setInteraction((p) => (p === "active" ? "default" : "active"));
		};

		e.addEventListener("mouseenter", setHover);
		e.addEventListener("mouseleave", setDefault);

		return () => {
			e.removeEventListener("mouseenter", setHover);
			e.removeEventListener("mouseleave", setDefault);
		};
	}, []);

	// console.log(interaction);

	const getStyle = (() => {
		if (p.isActive) return styleConfig.active;
		else {
			return styleConfig[interaction];
		}
	})();

	return (
		<div className={style.container}>
			<motion.div
				className={style.buttonContainer}
				ref={ref}
				animate={getStyle.buttonContainer}
				onClick={p.onClick}
			>
				<motion.p animate={getStyle.buttonText}>
					{p.buttonText ? p.buttonText : ""}
				</motion.p>
			</motion.div>
			<motion.div
				className={style.labelContainer}
				animate={getStyle.labelContainer}
			>
				<p className="body">{p.labelText ? p.labelText : ""}</p>
			</motion.div>
		</div>
	);
}

export default DisplayFlop;
