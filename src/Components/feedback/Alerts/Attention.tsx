import { Alert, AlertColor, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
	severity: AlertColor | undefined;
	children?: React.ReactNode
}

export default function Attention(props: Props) {
	const [show, setShow] = useState(true);
	if (show) {
		return (
			<Alert
				severity={props.severity}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							setShow(false);
						}}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}
				sx={{ mb: 2 }}
			>
				{props.children}
			</Alert>
		);
	} else return <></>;
}
