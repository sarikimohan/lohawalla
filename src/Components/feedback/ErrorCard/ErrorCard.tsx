import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { motion } from "framer-motion";

export interface ErrorCardProps {
	messages: (string | undefined)[];
	turnToSuccess?: boolean;
	handleCut?: () => void;
	primaryAction: {
		onClick?: () => void;
		label?: string;
	};
	secondaryAction?: {
		onClick?: () => void;
		label?: string;
	};
}

export default function ErrorCard(props: ErrorCardProps) {
	const { secondaryAction } = props;
	return (
		<div
			style={{ maxWidth: 400, width: "100%" }}
			className="bg-white rounded-xl p-8 border"
		>
			<div className="flex justify-between items-center">
				<h1
					className={`text-xl font-bold letter-tight ${
						props.turnToSuccess ? "text-green-500" : "text-red-800"
					} mb-3`}
				>
					{props.turnToSuccess ? "Success" : "Error Occured"}
				</h1>
				<motion.div
					whileHover={{ scale: 1.1, rotate: 360 }}
					whileTap={{ scale: 0.9 }}
					className="flex items-center cursor-pointer"
					onClick={props.handleCut}
				>
					<HighlightOffIcon />
				</motion.div>
			</div>
			<h2 className="text-md font-medium letter-tight text-slate-900 mb-2">
				Messages
			</h2>

			<div className="container mb-7">
				{props.messages.map(
					(v, i) =>
						v && (
							<div className="flex mb-1 items-center" key={i}>
								<div className="mr-2">
									{props.turnToSuccess ? (
										<DoneAllIcon className="text-green-500" />
									) : (
										<ErrorOutlineIcon className="text-red-500" />
									)}
								</div>
								<div>
									<p className="text-base text-slate-600">{v}</p>
								</div>
							</div>
						)
				)}
			</div>

			<div className="flex">
				<div className="mr-3">
					<button
						onClick={props.primaryAction.onClick}
						className="rounded-full bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 active:scale-95"
					>
						{props.primaryAction.label ? props.primaryAction.label : "Close"}
					</button>
				</div>
				<div>
					{secondaryAction && (
						<button
							onClick={secondaryAction.onClick}
							className="rounded-full bg-white text-slate-700 border px-4 py-2 hover:bg-slate-100 active:scale-95"
						>
							{secondaryAction.label}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
