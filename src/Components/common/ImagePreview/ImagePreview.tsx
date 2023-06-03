import { ImageIndex } from "@src/assets/AssetIndex";
import React, { useState } from "react";
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
		<div className={style.container + ' border p-3 rounded-md bg-white'}>
			<div className="crow border-b mb-3">
				<div
					style={{ height: widthConf.width / 1.66 }}
					className={style.imageLargeContainer + " mb-4"}
					ref={widthConf.ref}
				>
					<img src={images[selection]} className={style.imageView} />
				</div>
			</div>
			<div className="crow">
				{images.map((v, i) => (
					<div className="mr-2">
						<ImageSmall
							index={i}
							src={v}
							currentSelected={selection}
							setSelected={function (): void {
								setSelection(i);
							}}
							key={i}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default ImagePreview;
