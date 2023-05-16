import { Avatar } from "@mui/material";
import React from "react";

interface ProfileNameViewProps {
	src?: string;
	name?: string;
}

function ProfileNameView(props: ProfileNameViewProps) {
	const { name = "Profile Name" } = props;
	return (
		<div className="d-flex vc">
			<div className="mr-4">
				<Avatar sx={{ width: 92, height: 92 }} src={props.src} />
			</div>
			<div>
				<p className="body fcolor-fuschia">Hello</p>
				<p className="h2 fcolor-fuschia">{name}</p>
			</div>
		</div>
	);
}

export default ProfileNameView;
