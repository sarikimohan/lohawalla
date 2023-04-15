import AssetIndex from "@src/assets/AssetIndex";
import { motion } from "framer-motion";
import React, { useState } from "react";
import style from "./Input.module.css";

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
  DEFAULT = 'DEFAULT',
  HOVER = 'HOVER',
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}


interface InputProps<T = string> {
	width: string | number;
	error: { hasError: boolean; errorMessage: string };
	isValid: boolean;
	setData: (e: T) => void;
	onBlur?: (e: T) => void;
	data: T;
	type: React.HTMLInputTypeAttribute;
	inputStateStylesConfig?: InputStateStyles;
	placeHolder: string;
	inputClassName?: string;
	maxLength?: number;
	pattern?: string;
	disabled?: boolean;
	height?: number;
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

function mapper(state: InputInteractions, props: InputProps): ComStyles {
	const _styles = props.inputStateStylesConfig
		? props.inputStateStylesConfig
		: styles;

	if (props.isValid) return _styles.valid;
	if (props.error.hasError) return _styles.error;

	switch (state) {
		case InputInteractions.ACTIVE:
			return _styles.active;
	}

	return styles.default;
}

function IconMapper(
	state: InputInteractions,
	_props: InputProps
): React.ReactNode {
	if (_props.isValid) {
		return <AssetIndex.TickIcon />;
	}

	if (_props.error.hasError) {
		return <AssetIndex.ErrorIcon />;
	}

	return <></>;
}

function Input(props: InputProps) {
	const [interaction, setInteraction] = useState<InputInteractions>(
		InputInteractions.DEFAULT
	);

	return (
		<div className={style.wrapper} style={{ width: props.width }}>
			<motion.div
				className={style.container}
				style={{ ...styles.default.container, height: props.height }}
				animate={mapper(interaction, props).container}
			>
				<div className={style.inputBox}>
					<input
						type={props.type}
						className={style.input + " " + props.inputClassName}
						placeholder={props.placeHolder}
						onFocus={() => setInteraction(InputInteractions.ACTIVE)}
						onBlur={(e) => {
							props.onBlur && props.onBlur(e.target.value);
							setInteraction(InputInteractions.DEFAULT);
						}}
						onChange={(e) => {
							props.setData(e.target.value);
						}}
						value={props.data}
						maxLength={props.maxLength}
						pattern={props.pattern}
						disabled={props.disabled}
					/>
				</div>
				<div className={style.iconBox}>{IconMapper(interaction, props)}</div>
			</motion.div>
			{props.error.hasError && (
				<p className="mt-1" style={{ color: "red", fontSize: 13 }}>
					{props.error.errorMessage}
				</p>
			)}
		</div>
	);
}

export default Input;
