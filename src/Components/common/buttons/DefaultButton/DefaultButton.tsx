import { animate, motion } from "framer-motion";
import React from "react";
import style from "./DefaultButton.module.css";
import {
	InteractionEnum,
	MouseInteractions,
} from "@src/modules/hooks/useInteraction/types";
import useInteraction from "@src/modules/hooks/useInteraction/useInteraction";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import InteractionObserver from "../../InteractionObserver/InteractionObserver";
import { CircularProgress } from "@mui/material";

interface StylesForStates {
	transition?: { duration: number };
	hover: { text: object; container: object };
	default: { text: object; container: object };
	active: { text: object; container: object };
}

interface DefaultButtonProps {
	styles?: StylesForStates;
	containerClassName?: string;
	textClassName?: string;
	onClick: () => void;
	label: string;
	Controller?: (
		action: MouseInteractions,
		prev: InteractionEnum
	) => InteractionEnum;
	removeWindowBlur?: boolean;
	defaultStyles?: { container: object; text: object };
	loading?: boolean;
	loadingColor?:
		| string
		| {
				default: string;
				hover: string;
				active: string;
		  };
	initialValue?: InteractionEnum;
}

const defaultStyles: StylesForStates = {
	transition: { duration: 0.3 },
	hover: {
		text: {
			color: "var(--light)",
		},
		container: {
			background: "var(--text-body)",
		},
	},
	default: {
		text: {
			fontSize: 16,
			fontWeight: 700,
			letterSpacing: "1px",
			color: "var(--text-body)",
			textTransform: "uppercase",
		},
		container: {
			padding: "0 24px",
			height: 48,
			borderRadius: 8,
			background: "#e6e8ed",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	},
	active: {
		text: {
			color: "var(--light)",
		},
		container: {
			background: "var(--fuschia)",
		},
	},
};

function getStylesForState(state: InteractionEnum, styles: StylesForStates) {
	if (state === InteractionEnum.ACTIVE) return styles.active;
	switch (state) {
		// case InteractionEnum.DEFAULT:
		// 	return styles.default;
		case InteractionEnum.HOVER:
			return styles.hover;
	}
	return { container: {}, text: {} };
}

function DefaultButton(props: DefaultButtonProps) {
	const [interaction, setInteraction] = useInteraction(props.initialValue);
	let defaultStyles_ = { ...defaultStyles };
	defaultStyles_.default = {
		container: {
			...defaultStyles.default.container,
			...props.defaultStyles?.container,
		},
		text: { ...defaultStyles.default.text, ...props.defaultStyles?.text },
	};
	const animateStyle = props.styles ? props.styles : defaultStyles_;
	const { container, text } = getStylesForState(interaction, animateStyle);
	const containerClassName =
		(props.containerClassName ? props.containerClassName : "") +
		style.container;
	const textClassName =
		(props.textClassName ? props.textClassName : "") + style.text;
	let color = "";
	let inputcolor = props.loadingColor;
	if (inputcolor) {
		if (typeof inputcolor === "string") {
			color = inputcolor;
		} else {
			if (interaction === InteractionEnum.ACTIVE) {
				color = inputcolor.active;
			} else if (interaction === InteractionEnum.HOVER) {
				color = inputcolor.hover;
			} else {
				color = inputcolor.default;
			}
		}
	}

	return (
		<motion.div
			style={animateStyle.default.container}
			animate={container}
			className={containerClassName}
			transition={props.styles?.transition}
			onClick={() => props.onClick()}
		>
			{props.loading ? (
				// <LoadingSpinner radius={28} color={color} />
				<CircularProgress size={"20px"} sx={{ color }} disableShrink />
			) : (
				<motion.p
					style={{ ...animateStyle.default.text, userSelect: "none" }}
					animate={text}
					className={textClassName}
					transition={props.styles?.transition}
				>
					{props.label}
				</motion.p>
			)}
			<InteractionObserver
				interaction={interaction}
				setInteraction={setInteraction}
				Controller={props.Controller}
				removeWindowBlur={props.removeWindowBlur}
			/>
		</motion.div>
	);
}

export default DefaultButton;
