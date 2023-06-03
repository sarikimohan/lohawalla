import React, { useEffect, useState } from "react";

export default function useHeight() {
	const ref = React.createRef<HTMLDivElement>();
	const [height, setHeight] = useState(0);
	useEffect(() => {
		const e = ref.current as HTMLDivElement;
		if (e === null) return;
		const boundingClientRect = e.getBoundingClientRect();
		setHeight(boundingClientRect ? boundingClientRect.height : 120);
	}, []);
	return { ref, height };
}
