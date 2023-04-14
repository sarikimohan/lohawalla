import React from "react";

interface SpacingDivProps extends SpacingParams {
	children?: React.ReactNode;
	containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

function SpacingDiv({ children, containerProps, ...props }: SpacingDivProps) {
	return <div {...containerProps} style={{ ...props, ...containerProps?.style }}>{children}</div>;
}

export default SpacingDiv;
