import { motion } from "framer-motion";
import React from "react";

interface BorderOnHoverProps {
	children?: React.ReactNode;
	borderConfig?: {
		borderWidth?: number;
		borderColor?: string;
		borderRadius?: number;
	};
}

function BorderOnHover({
	children,
	borderConfig = {
		borderWidth: 1,
		borderColor: "var(--iris)",
		borderRadius: 0,
	},
}: BorderOnHoverProps) {
	return (
		<motion.div
			className="cursor-pointer"
			whileHover={{
				border: `${borderConfig.borderWidth}px solid ${borderConfig.borderColor}`,
			}}
		>
			{children}
		</motion.div>
	);
}

export default BorderOnHover;
