import React from "react";

interface TypeStyleProps extends SpacingParams {
	children?: React.ReactNode;
	textParams?: React.HTMLAttributes<HTMLParagraphElement>;
}

export function Title({ children, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="title"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{children}
		</p>
	);
}

export function H2({ children, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="h2"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{children}
		</p>
	);
}

export function H3({ children, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="h3"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{children}
		</p>
	);
}

export function Subtitle({ children, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="subtitle"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{children}
		</p>
	);
}

export function Body({ children, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="body"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{children}
		</p>
	);
}

export function Bold({ children, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="bold"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{children}
		</p>
	);
}

export function Small({ children, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="small"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{children}
		</p>
	);
}

export function Pretitle({ children, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="pretitle"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{children}
		</p>
	);
}

export function Button({ children, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="button"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{children}
		</p>
	);
}

export function Link({ children, textParams, ...params }: TypeStyleProps) {
	return (
		<p
			className="link"
			style={{
				...textParams?.style,
				...params,
			}}
		>
			{children}
		</p>
	);
}
