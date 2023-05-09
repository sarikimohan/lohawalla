import { Button } from "@mui/material";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";

interface Props {
	handleAdd?: () => void;
}

export default function AddMore(props: Props) {
	return (
		<Button
			onClick={props.handleAdd}
			variant="outlined"
			sx={{ borderColor: "var(--iris)", minWidth: "max-content" }}
			startIcon={<AssetIndex.PlusIconBlue />}
		>
			<p className="button fcolor-iris">ADD MORE</p>
		</Button>
	);
}
