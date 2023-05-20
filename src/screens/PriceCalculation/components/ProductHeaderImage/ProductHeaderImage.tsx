import React, { useEffect } from "react";
import style from "./ProductHeaderImage.module.css";
import { ImageIndex } from "@src/assets/AssetIndex";

interface ProductHeaderImageProps {
	src?: string;
}

function ProductHeaderImage(p: ProductHeaderImageProps) {
	const ref = React.createRef<HTMLImageElement>();

	useEffect(() => {
		const e = ref.current as HTMLImageElement;
		const width = parseFloat(getComputedStyle(e).width);
		const height = parseFloat(getComputedStyle(e).height);
		if (width < height) {
			e.style.width = "120px";
		} else {
			e.style.height = "120px";
		}
	}, []);

	return (
		<div className={style.container}>
			<img src={p.src ? p.src : ImageIndex.PipesImage} ref={ref} />
		</div>
	);
}

export default ProductHeaderImage;
