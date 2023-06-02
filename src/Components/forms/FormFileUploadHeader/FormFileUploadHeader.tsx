import AssetIndex from "@src/assets/AssetIndex";
import React from "react";

export interface RIFormFileUploadHeader {
	children?: React.ReactNode;
	marginBottom?: number;
}

export namespace PIFormFileUploadHeader {}

export default function FormFileUploadHeader(props: RIFormFileUploadHeader) {
	return (
		<div className="vc w-100" style={{ marginBottom: props.marginBottom }}>
			<p className="h3 fcolor-text-body fw-bold mr-4">{props.children}</p>
			<AssetIndex.LinkIcon />
		</div>
	);
}
