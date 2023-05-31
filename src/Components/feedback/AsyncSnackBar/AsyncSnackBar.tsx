import { Snackbar } from "@mui/material";
import React from "react";

export interface RIAsyncSnackBar {
	asyncState: AsyncState;
}

export namespace PIAsyncSnackBar {}

export default function AsyncSnackBar(props: RIAsyncSnackBar) {
	const open = props.asyncState.status !== "dormant";
	return <Snackbar open={open} message={props.asyncState.message} />;
}
