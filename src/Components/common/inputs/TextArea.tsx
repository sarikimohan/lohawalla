import AssetIndex from "@src/assets/AssetIndex";
import { motion } from "framer-motion";
import React, { useState } from "react";
import style from "./Input.module.css";
import { useField } from "formik";

interface ComStyles {
	container?: object;
}

interface InputStateStyles {
	active: ComStyles;
	default: ComStyles;
	error: ComStyles;
	valid: ComStyles;
}

enum InputInteractions {
	DEFAULT = "DEFAULT",
	HOVER = "HOVER",
	ACTIVE = "ACTIVE",
	DISABLED = "DISABLED",
	ERROR = "ERROR",
	SUCCESS = "SUCCESS",
}

interface InputProps<T = string> {
	width: string | number;
	inputStateStylesConfig?: InputStateStyles;
	placeHolder: string;
	inputClassName?: string;
	maxLength?: number;
	disabled?: boolean;
	height?: number;
	name: string;
}

const styles: InputStateStyles = {
	active: {
		container: {
			border: "1px solid var(--iris)",
			boxShadow: "0px 0px 0px 4px rgba(75, 77, 237, 0.2)",
		},
	},
	default: {
		container: {
			boxShadow: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.256)",
		},
	},
	error: {
		container: {
			boxShadow: "0px 0px 0px 4px rgba(237, 75, 158, 0.2)",
			border: "1px solid #ED4B9E",
		},
	},
	valid: {
		container: {
			background: "#FFFFFF",
			border: "1px solid #31D0AA",
			boxShadow: "0px 0px 0px 4px rgba(49, 208, 170, 0.2)",
		},
	},
};

function mapper(
	state: InputInteractions,
	props: InputProps,
	status: "default" | "valid" | "error"
): ComStyles {
	const _styles = props.inputStateStylesConfig
		? props.inputStateStylesConfig
		: styles;

	if (status === "valid") return _styles.valid;
	if (status === "error") return _styles.error;

	switch (state) {
		case InputInteractions.ACTIVE:
			return _styles.active;
	}

	return styles.default;
}

function IconMapper(
	state: InputInteractions,
	status: "default" | "valid" | "error"
): React.ReactNode {
	if (status === "valid") {
		return <AssetIndex.TickIcon />;
	}

	if (status === "error") {
		return <AssetIndex.ErrorIcon />;
	}

	return <></>;
}

function FormikTextArea(props: InputProps) {
	const [interaction, setInteraction] = useState<InputInteractions>(
		InputInteractions.DEFAULT
	);

	const [field, meta, helpers] = useField(props.name);

	const { onBlur, ...rest } = field;

	return (
		<div className={style.wrapper} style={{ width: props.width }}>
			<motion.div
				className={style.container}
				style={{ ...styles.default.container, height: props.height }}
				animate={
					mapper(
						interaction,
						props,
						meta.touched ? (meta.error ? "error" : "valid") : "default"
					).container
				}
			>
				<div className={style.inputBox}>
					<textarea
						className={style.input + " " + props.inputClassName}
						placeholder={props.placeHolder}
						onFocus={() => setInteraction(InputInteractions.ACTIVE)}
						onBlur={(e) => {
							setInteraction(InputInteractions.DEFAULT);
							onBlur(e);
						}}
						maxLength={props.maxLength}
						disabled={props.disabled}
						{...rest}
					/>
				</div>
				<div className={style.iconBox}>
					{IconMapper(
						interaction,
						meta.touched ? (meta.error ? "error" : "valid") : "default"
					)}
				</div>
			</motion.div>
			{meta.touched && meta.error && (
				<p className="mt-1" style={{ color: "red", fontSize: 13 }}>
					{meta.error}
				</p>
			)}
		</div>
	);
}

export default FormikTextArea;
