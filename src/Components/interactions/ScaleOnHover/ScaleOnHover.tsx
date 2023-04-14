import { motion } from "framer-motion";
import React from "react";

interface ScaleOnHoverProps {
	children: React.ReactNode;
	scaleAmount?: number;
}

function ScaleOnHover(props: ScaleOnHoverProps) {
	return (
		<motion.div
			whileHover={{ scale: props.scaleAmount ? props.scaleAmount : 1.1 }}
		>
			{props.children}
		</motion.div>
	);
}

export default ScaleOnHover;
