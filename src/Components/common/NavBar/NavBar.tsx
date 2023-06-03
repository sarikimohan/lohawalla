import React from "react";
import Clock from "../Clock/Clock";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import style from "./NavBar.module.css";
import { useAuthGuardContext } from "@src/auth/AuthGuard/AuthGuard";
import { Link } from "react-router-dom";

interface NavBarProps {
	leftCom: React.ReactNode;
}

function NavBar(p: NavBarProps) {
	const { loginData } = useAuthGuardContext();
	return (
		<div className={style.box + ' bg-white'}>
			<div className={style.container + " vc"}>
				{/* <p className="subtitle fcolor-text-body fw-medium">Category</p> */}
				{p.leftCom}
				<div className={style.rightContents}>
					<div className={style.clockWrapper}>
						<Clock />
					</div>
					<div className={style.divider}></div>
					<Link to="/profile">
						<div className={style.profileWrapper}>
							<ProfileIcon name={loginData.name} />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
