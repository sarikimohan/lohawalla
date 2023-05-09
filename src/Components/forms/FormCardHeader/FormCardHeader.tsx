import React from "react";

interface Props {
	subheading?: string;
	heading?: string;
}

export default function FormCardHeader({
	subheading = "Enter",
	heading = "Heading",
}: Props) {
	return (
		<div className="mb-5">
			<p className="text-md text-subtitle">{subheading}</p>
			<h3 className="text-2xl font-medium text-fuschia">{heading}</h3>
		</div>
	);
}
