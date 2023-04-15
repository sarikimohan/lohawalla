import { Small } from "@src/Components/common/Typography/TypeStyles";
import BorderOnHover from "@src/Components/interactions/BorderOnHover/BorderOnHover";
import ScaleOnHover from "@src/Components/interactions/ScaleOnHover/ScaleOnHover";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

function NumberDisplay(data: Categories.CategoryGridData, width: number) {
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate(`/categores/setActiveCompany/${data._id}`)}>
			<ScaleOnHover>
				<BorderOnHover>
					<div style={{ width }}>
						<Small textParams={{ className: "fcolor-text-body" }}>
							{data.noOfItems}
						</Small>
					</div>
				</BorderOnHover>
			</ScaleOnHover>
		</div>
	);
}

export default NumberDisplay;
