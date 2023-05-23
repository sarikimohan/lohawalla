import React from "react";
import style from "./Avatar.module.css";

interface AvatarProps {
	src: string;
	radius: number;
}

function Avatar(p: AvatarProps) {
	const src =
		"https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?cs=srgb&dl=pexels-ali-pazani-2787341.jpg&fm=jpg";
	return (
		<div
			className={style.container}
			style={{ height: p.radius, width: p.radius }}
		>
			<img src={p.src} alt={"profile image"} className={style.image} />
		</div>
	);
}

export default Avatar;
