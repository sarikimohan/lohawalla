import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

interface Props {
	children: React.ReactNode;
	onClick?: () => void;
	isLoading?: boolean;
}

export default function SaveButton(props: Props) {
	return (
		<motion.button
			className="h-12 px-16 rounded-md bg-slate-900 text-white font-semibold hover:bg-slate-800"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={props.onClick}
		>
			{props.isLoading ? (
				<CircularProgress size={24} sx={{ color: "white" }} />
			) : (
				props.children
			)}
		</motion.button>
	);
}
