import React from "react";
import ErrorCard, { ErrorCardProps } from "../ErrorCard/ErrorCard";
import StatusPreview, {
	StatusPreviewMessageFormat,
} from "./component/StatusPreview/StatusPreview";
import getGatedValue from "./services/getGatedValue";

interface Props {
	asyncStates: AsyncState[];
	children?: React.ReactNode;
	primaryAction: {
		onClick?: () => void;
		label?: string;
	};
	secondaryAction?: {
		onClick?: () => void;
		label?: string;
	};
}

export default function AsyncProcessBoundary({
	asyncStates,
	children,
	...props
}: Props) {
	const status = {
		showCard: false,
		hasSomeErrors: false,
		hasAllErrors: false,
	};

	const messages: StatusPreviewMessageFormat[] = [];

	let count = 0;
	for (let as of asyncStates) {
		if (as.status === "failed") {
			count++;
			status.hasSomeErrors = true;
		}
		messages.push({ status: as.status, message: as.message });
	}

	if (count !== 0 && count === asyncStates.length) {
		status.hasAllErrors = true;
	}

	if (status.showCard) {
		return (
			<StatusPreview
				heading={getGatedValue<"Success" | "Warning" | "Error">([
					{
						value: "Success",
						gate: !status.hasAllErrors && !status.hasSomeErrors,
					},
					{
						value: "Warning",
						gate: status.hasSomeErrors && !status.hasAllErrors,
					},
					{
						value: "Error",
						gate: status.hasAllErrors,
					},
				])}
				messages={messages}
				{...props}
			/>
		);
	}

	return <>{children}</>;
}
