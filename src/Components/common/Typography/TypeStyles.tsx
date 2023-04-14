import React from "react";

interface TypeStyleProps extends SpacingParams {
	text?: string;
	textParams?: React.HTMLAttributes<HTMLParagraphElement>;
}

export function Title({ text, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="title"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{text}
		</p>
	);
}

export function H2({ text, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="h2"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{text}
		</p>
	);
}

export function H3({ text, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="h3"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{text}
		</p>
	);
}

export function Subtitle({ text, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="subtitle"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{text}
		</p>
	);
}

export function Body({ text, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="body"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{text}
		</p>
	);
}

export function Bold({ text, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="bold"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{text}
		</p>
	);
}

export function Small({ text, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="small"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{text}
		</p>
	);
}

export function Pretitle({ text, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="pretitle"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{text}
		</p>
	);
}

export function Button({ text, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="button"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{text}
		</p>
	);
}

export function Link({ text, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="link"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{text}
		</p>
	);
}
