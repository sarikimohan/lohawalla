import ImageNameDisplay from "@src/Components/common/ImageNameDisplay/ImageNameDisplay";
import React from "react";
import { useNavigate } from "react-router-dom";

function ImageNameContainer(data: Categories.CategoryGridData, width: number) {
	const navigate = useNavigate();
	return (
		<div style={{ width }} onClick={() => navigate(`/categories/${data._id}`)}>
			<ImageNameDisplay
				name={data.categoryName.name}
				imageURL={data.categoryName.imageURL}
			/>
		</div>
	);
}

export default ImageNameContainer;
