import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";

interface Props {
	onClose: () => void;
}

export default function Header(props: Props) {
	return (
		<div className="flex justify-between mb-5">
			<div>
				<p className="body fcolor-text-subtitle">{"Add"}</p>
				<p className="h2 fcolor-fuschia fw-bold">{"More"}</p>
			</div>
			<div onClick={props.onClose}>
				<RotateAndScale>
					<AssetIndex.CloseIcon />
				</RotateAndScale>
			</div>
		</div>
	);
}
