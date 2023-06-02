import { CircularProgress, LinearProgress } from "@mui/material";
import React from "react";

export interface RILoadingWidget {}

export namespace PILoadingWidget {}

export default function LoadingWidget(props: RILoadingWidget) {
	return (
		<div
			className="h-full w-full flex justify-center items-center"
			style={{ minHeight: "100vh" }}
		>
			<div
				className="rounded-xl shadow-xl border flex flex-col justify-center items-center "
				style={{ width: 300, height: 200 }}
			>
				<div className="mb-8">
					<p className="text-3xl font-bold">Lohawalla</p>
				</div>
				<div className="flex justify-between">
					<CircularProgress sx={{ color: "black" }} />
				</div>
			</div>
		</div>
	);
}
