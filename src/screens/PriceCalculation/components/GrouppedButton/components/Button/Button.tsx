import { motion } from "framer-motion";
import React from "react";
import style from "./Button.module.scss";

function Button(p: { isActive?: boolean; text: string; onClick?: () => void }) {
	return (
		<motion.div
			className={style.container}
			animate={
				p.isActive
					? { backgroundColor: "var(--iris)", border: "1px solid var(--iris)" }
					: {}
			}
			onClick={p.onClick && p.onClick}
		>
			<motion.p
				className="body"
				animate={p.isActive ? { color: "var(--light)" } : {}}
			>
				{p.text}
			</motion.p>
		</motion.div>
	);
}

export default Button;
