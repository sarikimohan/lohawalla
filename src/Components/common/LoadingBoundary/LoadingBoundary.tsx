import { Alert, CircularProgress } from "@mui/material";
import React from "react";
import { Small } from "../Typography/TypeStyles";

interface LoadingBoundaryInterface {
	children: React.ReactNode;
	asyncState?: AsyncState[] | AsyncState;
	size?: number | string;
	loadingWidget?: React.ReactNode;
}

function LoadingBoundary({
	children,
	asyncState,
	size = 24,
	loadingWidget,
}: LoadingBoundaryInterface) {
	if (asyncState && !Array.isArray(asyncState)) {
		return (
			<>
				{asyncState.status === "initialized" && (
					<div>
						{loadingWidget ? (
							loadingWidget
						) : (
							<CircularProgress size={size} disableShrink />
						)}
					</div>
				)}
				{asyncState.status === "failed" && (
					<div>
						<Alert severity="error">{asyncState.message}</Alert>
					</div>
				)}
				{(asyncState.status === "dormant" || asyncState.status === "success") &&
					children}
			</>
		);
	} else if (asyncState && Array.isArray(asyncState)) {
		const isSuccess = asyncState.reduce(
			(a, c) => a && c.status === "success",
			true
		);
		const hasFailed = asyncState.reduce(
			(a, c) => a || c.status === "failed",
			false
		);
		const isDormant = asyncState.reduce(
			(a, c) => a && c.status === "dormant",
			true
		);
		if (isDormant || isSuccess) {
			return <>{children}</>;
		}
		if (hasFailed) {
			return (
				<div>
					<Alert severity="error">
						{asyncState.map((v) => v.message).join("\n")}
					</Alert>
				</div>
			);
		}
		return (
			<div>
				{loadingWidget ? (
					loadingWidget
				) : (
					<CircularProgress size={size} disableShrink />
				)}
			</div>
		);
	}
	return <>{children}</>;
}

export default LoadingBoundary;
