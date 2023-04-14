import { Small } from "@src/Components/common/Typography/TypeStyles";
import BorderOnHover from "@src/Components/interactions/BorderOnHover/BorderOnHover";
import ScaleOnHover from "@src/Components/interactions/ScaleOnHover/ScaleOnHover";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

function NumberDisplay(data: Categories.CategoryGridData, width: number) {
	const navigate = useNavigate();
	return (
		// <motion.p
		// 	className="small fcolor-text-body fw-medium cursor-pointer h-100"
		// 	style={{
		// 		width,
		// 		color: "var(--iris)",
		// 		border: "1px solid rgb(0,0,0,0)",
		// 	}}
		// 	whileHover={{ borderColor: "var(--iris)", scale: 1.1 }}
		// 	onClick={() => navigate(`/category/setActiveCompany/${data._id}`)}
		// >
		// 	{data.noOfItems}
		// </motion.p>
		<div>
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
