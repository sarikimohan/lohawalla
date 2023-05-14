import { Alert, CircularProgress } from "@mui/material";
import React from "react";
import { Small } from "../Typography/TypeStyles";

interface LoadingBoundaryInterface {
	children: React.ReactNode;
	asyncState: AsyncState;
	size?: number | string;
}

function LoadingBoundary({
	children,
	asyncState,
	size = 24,
}: LoadingBoundaryInterface) {
	return (
		<>
			{asyncState.status === "initialized" && (
				<div>
					<CircularProgress size={size} disableShrink />
				</div>
			)}
			{asyncState.status === "failed" && (
				<div>
					<Alert severity="error">{asyncState.message}</Alert>
				</div>
			)}
			{asyncState.status === "dormant" ||
				(asyncState.status === "success" && children)}
		</>
	);
}

export default LoadingBoundary;
