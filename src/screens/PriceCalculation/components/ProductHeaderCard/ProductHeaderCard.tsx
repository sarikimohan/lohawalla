import React from "react";
import { Box, Card } from "@mui/material";
import ProductHeaderImage from "../ProductHeaderImage/ProductHeaderImage";

interface Props {
	data: {
		name: string;
		/**
		 * eg - company name
		 */
		bottomLeftText: string;
		/**
		 * sold amount
		 */
		bottomRightText: string;
	};
}

export default function ProductHeaderCard(props: Props) {
	const { data } = props;
	return (
		<Card
			variant="outlined"
			sx={{ borderRadius: "12px" }}
			className="p-2 mb-3 w-fit"
		>
			<Box padding={3} display={"flex"}>
				<Box marginRight={2.5}>
					<ProductHeaderImage />
				</Box>
				<Box marginTop={1.5}>
					<Box marginBottom={2}>
						<p className="h2 fcolor-fuschia">{data.name}</p>
					</Box>

					<Box display={"flex"} alignItems="center">
						<Box marginRight={1}>
							<p className="body fcolor-text-body">{data.bottomLeftText}</p>
						</Box>
						<div
							style={{
								height: "10px",
								width: 1,
								background: "lightgrey",
								marginRight: 8,
							}}
						></div>
						<Box marginRight={1}>
							<p className="body fcolor-text-subtitle">
								{data.bottomRightText}
							</p>
						</Box>
					</Box>
				</Box>
			</Box>
		</Card>
	);
}
