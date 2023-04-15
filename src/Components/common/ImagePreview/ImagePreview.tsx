import { ImageIndex } from "@src/assets/AssetIndex";

import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { CategorySpecificationContext } from "../../../screens/CategorySpecification/CategorySpecification";
import style from "./ImagePreview.module.css";
import ImageSmall from "../ImageSmall/ImageSmall";
import useWidth from "@src/modules/hooks/useWidth";

interface ImagePreviewProps {
	images?: string[];
}

function ImagePreview(props: ImagePreviewProps) {
	const [selection, setSelection] = useState(0);
	const images =
		props.images && props.images.length
			? props.images
			: [
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBlFGP4dcU9CeWNeQIBALBDalzWaKUxP_7FA&usqp=CAU",
					ImageIndex.PipesImage,
			  ];
	const widthConf = useWidth({});

	return (
		<div className={style.container}>
			<div className="crow">
				<div
					style={{ height: widthConf.width / 1.66 }}
					className={style.imageLargeContainer + " mb-3"}
					ref={widthConf.ref}
				>
					<img src={images[selection]} className={style.imageView}/>
				</div>
			</div>
			<div className="crow">
				{images.map((v, i) => (
					<ImageSmall
						index={i}
						src={v}
						currentSelected={selection}
						setSelected={function (): void {
							setSelection(i);
						}}
						key={i}
					/>
				))}
			</div>
		</div>
	);
}

export default ImagePreview;
