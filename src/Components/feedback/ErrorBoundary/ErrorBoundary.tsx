import React from "react";
import ErrorCard, { ErrorCardProps } from "../ErrorCard/ErrorCard";

interface Props extends ErrorCardProps {
	asyncStates: AsyncState[];
	children?: React.ReactNode;
}

export default function ErrorBoundary({
	asyncStates,
	children,
	...props
}: Props) {
	const hasFailed = asyncStates.reduce(
		(a, c) => a && c.status === "failed",
		true
	);
	const [failedMessages, successMessages] = [
		asyncStates.filter((v) => v.status === "failed").map((v) => v.message),
		asyncStates.filter((v) => v.status === "success").map((v) => v.message),
	];

	props.messages = failedMessages;

	if (hasFailed) {
		return <ErrorCard {...props} />;
	} else {
		return <>{children}</>;
	}
}
