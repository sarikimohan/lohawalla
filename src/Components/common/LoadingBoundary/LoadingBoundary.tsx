import { Alert, CircularProgress } from "@mui/material";
import React from "react";
import { Small } from "../Typography/TypeStyles";

interface LoadingBoundaryInterface {
	children: React.ReactNode;
	asyncState?: AsyncState;
	size?: number | string;
	loadingWidget?: React.ReactNode;
}

function LoadingBoundary({
	children,
	asyncState,
	size = 24,
	loadingWidget,
}: LoadingBoundaryInterface) {
	if (asyncState) {
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
	} else {
		return <>{children}</>;
	}
}

export default LoadingBoundary;
