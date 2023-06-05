import React from "react";

export interface GateElementPair {
	gate: boolean;
	element: React.ReactNode;
}

export interface OptionalRenderConfig {
	renderType: "all" | "first";
}

export interface RIOptionalRender {
	gate?: boolean;
	element?: React.ReactNode;
	gateElementList?: GateElementPair[];
	config?: OptionalRenderConfig;
}

export namespace PIOptionalRender {}

export default function OptionalRender(props: RIOptionalRender) {
	const renderconfig: OptionalRenderConfig = props.config
		? props.config
		: { renderType: "first" };
	const gate = props.gate ? props.gate : false;
	const element = props.element ? props.element : <></>;
	const gateElement = props.gateElementList ? props.gateElementList : [];
	gateElement.push({ gate, element });

	const renderList = gateElement.filter((v) => v.gate === true);

	if (renderList.length && renderconfig.renderType === "first") {
		return <>{renderList[0].element}</>;
	} else {
		return (
			<>
				{renderList.map((v, i) => (
					<React.Fragment key={i}>{v.element}</React.Fragment>
				))}
			</>
		);
	}
}
