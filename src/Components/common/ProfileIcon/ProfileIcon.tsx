import React from "react";
import style from "./ProfileIcon.module.css";
import Avatar from "../Avatar/Avatar";
import { ImageIndex } from "@src/assets/AssetIndex";

interface Props {
	name?: string;
	imageURL?: string;
}

function ProfileIcon(props: Props) {
	return (
		<div className={style.avatarContainer + " vc"}>
			<p className={style.nameText + " fcolor-text-body body fw-medium"}>
				{props.name ? props.name : "User"}
			</p>
			<div className={style.profileIconWrapper}>
				<Avatar
					src={props.imageURL ? props.imageURL : ImageIndex.DefaultUser}
					radius={36}
				/>
			</div>
		</div>
	);
}

export default ProfileIcon;
