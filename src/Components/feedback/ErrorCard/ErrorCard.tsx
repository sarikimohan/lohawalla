import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { motion } from "framer-motion";

interface Props {
	messages: string[];
	handleClose?: () => void;
	handleCut?: () => void;
}

export default function ErrorCard({ messages, handleClose, handleCut }: Props) {
	return (
		<div
			style={{ maxWidth: 400, width: "100%" }}
			className="bg-white rounded-xl p-8 border"
		>
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-bold letter-tight text-red-800 mb-3">
					Error Occured
				</h1>
				<motion.div
					whileHover={{ scale: 1.1, rotate: 360 }}
					whileTap={{ scale: 0.9 }}
					className="flex items-center cursor-pointer"
					onClick={handleCut}
				>
					<HighlightOffIcon />
				</motion.div>
			</div>
			<h2 className="text-md font-medium letter-tight text-slate-900 mb-2">
				Messages
			</h2>

			<div className="container mb-7">
				{messages.map((v) => (
					<div className="flex mb-1">
						<div className="mr-2">
							<ErrorOutlineIcon className="text-red-500" />
						</div>
						<div>
							<p className="text-base text-slate-600">{v}</p>
						</div>
					</div>
				))}
			</div>

			<button
				onClick={handleClose}
				className="rounded-full bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 active:scale-95"
			>
				close
			</button>
		</div>
	);
}
