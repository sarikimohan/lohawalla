import { motion } from "framer-motion";
import React, { useState } from "react";
import style from "./ImageSmall.module.css";
import ImageSmall from "./ImageSmall";
import AssetIndex, { ImageIndex } from "@src/assets/AssetIndex";
import useHeight from "@src/modules/hooks/useHeight";
import { CircularProgress } from "@mui/material";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import ErrorIcon from "@mui/icons-material/Error";
import StateUtils, {
	ServerStateUtils,
} from "@src/modules/StateManagement/Core/StateUtils";

export default function ImageSmallWithDelete(props: {
	src: string;
	asyncDelete?: () => Promise<void>;
	sideLength?: number;
}) {
	const [deleteAsync, setDeleteAsync] = useState<AsyncState>(
		AsyncStateFactory()
	);
	const asyncStateUtils = new StateUtils<AsyncState>(
		deleteAsync,
		setDeleteAsync
	);
	const heightHandle = useHeight();

	const handleDelete = async () => {
		if (props.asyncDelete === undefined) return;
		asyncStateUtils.mutateState((p) => {
			p.status = "initialized";
		});
		try {
			props.asyncDelete && (await props.asyncDelete());
			asyncStateUtils.mutateState((p) => {
				p.status = "success";
			});
		} catch (err) {
			asyncStateUtils.mutateState((p) => {
				p.status = "failed";
			});
		} finally {
			setTimeout(
				() =>
					asyncStateUtils.mutateState((p) => {
						p.status = "dormant";
					}),
				2000
			);
		}
	};

	return (
		<div
			className="p-2"
			style={{
				position: "relative",
				display: "block",
				width: "fit-content",
			}}
			ref={heightHandle.ref}
			onClick={handleDelete}
		>
			{deleteAsync.status !== "dormant" && (
				<div
					className="absolute w-full h-full z-30 flex items-center pl-5 pb-2"
					style={{ background: "white", opacity: 0.6 }}
				>
					{deleteAsync.status === "initialized" && (
						<CircularProgress size={"24px"} sx={{ color: "black" }} />
					)}
					{deleteAsync.status === "failed" && (
						<ErrorIcon
							style={{ height: "24px", width: "24px", color: "black" }}
						/>
					)}
				</div>
			)}
			<ImageSmall
				index={0}
				src={ImageIndex.CategoryImage}
				currentSelected={0}
				setSelected={function (): void {}}
				sideLength={66}
			/>
			<div
				style={{
					position: "absolute",
					top: 0,
					right: 0,
					transform: "scale(0.8)",
					cursor: "pointer",
				}}
				onClick={handleDelete}
			>
				<AssetIndex.MinusCircleIcon />
			</div>
		</div>
	);
}
