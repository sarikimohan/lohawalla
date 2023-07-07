import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

interface Actions {
	onClick: () => void;
	label: string;
}

export interface RIDeleteEntity {
	config: { primaryAction: Actions; secondaryActions: Actions };
	heading: string;
	subheading: string;
	loading: boolean;
}

export namespace PIDeleteEntity {}

export default function DeleteEntity(props: RIDeleteEntity) {
	return (
		<Backdrop open>
			<div className="p-6 bg-white rounded-xl" style={{ maxWidth: 400 }}>
				<div className="mb-3">
					<p className="text-xl font-semibold">{props.heading}</p>
				</div>
				<div className="mb-5">
					<p className="text-base text-slate-700">{props.subheading}</p>
				</div>

				<div className="flex justify-end">
					<div className="mr-2">
						<button
							className="rounded px-4 py-2 font-medium text-md text-white bg-indigo-500 active:scale-95 hover:brightness-90"
							onClick={
								!props.loading ? props.config.primaryAction.onClick : undefined
							}
						>
							{props.loading ? (
								<CircularProgress size={16} sx={{ color: "white" }} />
							) : (
								props.config.primaryAction.label
							)}
						</button>
					</div>
					<button
						className="rounded px-3 py-1 font-medium text-base bg-slate-50 text-slate-500 active:scale-95"
						onClick={
							!props.loading ? props.config.secondaryActions.onClick : undefined
						}
					>
						{props.config.secondaryActions.label}
					</button>
				</div>
			</div>
		</Backdrop>
	);
}
