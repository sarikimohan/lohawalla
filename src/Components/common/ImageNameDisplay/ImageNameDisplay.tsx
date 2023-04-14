import { ImageIndex } from "@src/assets/AssetIndex";
import React from "react";

interface ImageNameDisplayProps {
	name: string;
	imageURL: null | string;
}

function ImageNameDisplay(props: ImageNameDisplayProps) {
	return (
		<div className="vc cursor-pointer w-100">
			<div
				style={{
					height: 32,
					width: 32,
					borderRadius: 200,
					overflow: "hidden",
					objectFit: "cover",
					objectPosition: "center center",
				}}
			>
				<img
					src={props.imageURL ? props.imageURL : ImageIndex.CategoryImage}
					style={{ height: "100%", width: "100%" }}
				/>
			</div>
			<p className="small fcolor-text-body fw-medium ml-2">{props.name}</p>
		</div>
	);
}

export default ImageNameDisplay;
