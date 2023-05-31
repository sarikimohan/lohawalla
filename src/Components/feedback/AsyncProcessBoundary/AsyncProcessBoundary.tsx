import React from "react";
import ErrorCard, { ErrorCardProps } from "../ErrorCard/ErrorCard";

interface Props {
	asyncStates: AsyncState[];
	children?: React.ReactNode;
	primaryAction: {
		onClick?: () => void;
		label?: string;
	};
}

export default function AsyncProcessBoundary({
	asyncStates,
	children,
	...props
}: Props) {
	const hasFailed = asyncStates.reduce(
		(a, c) => a && c.status === "failed",
		true
	);
	const hasPassed = asyncStates.reduce(
		(a, c) => a && c.status === "success",
		true
	);

	const [failedMessages, successMessages] = [
		asyncStates.filter((v) => v.status === "failed").map((v) => v.message),
		asyncStates.filter((v) => v.status === "success").map((v) => v.message),
	];

	if (hasFailed) {
		return <ErrorCard messages={failedMessages} {...props} />;
	} else if (hasPassed) {
		return <ErrorCard turnToSuccess messages={successMessages} {...props} />;
	} else return <>{children}</>;
}
