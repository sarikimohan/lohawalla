import React from "react";
import style from "./Profile.module.css";
import ProfileNameView from "./components/ProfileNameView/ProfileNameView";
import { Button, Card, Divider } from "@mui/material";
import InfoCard from "./components/InfoCard/InfoCard";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import { useAuthGuardContext } from "@src/auth/AuthGuard/AuthGuard";

function Profile() {
	const { loginData, action } = useAuthGuardContext();

	return (
		<div style={{ flex: "1 0", overflow: "hidden" }}>
			<div className={style.navContainer} /*ref={ref}*/>
				<TitleNavBar title={"Profile"} />
			</div>
			<div
				className={style.pageContainer + " pt-10"}
				// style={{ height: `calc(100vh - ${height}px)` }}
			>
				<Card variant="outlined" className="p-8">
					<div className="crow mb-4">
						<ProfileNameView name={loginData.name} />
					</div>
					<Card variant="outlined" className="p-6 mb-3">
						<div className="mb-6 mt-2">
							<p className="h3 fcolor-fuschia">All Personal Informations</p>
						</div>
						<div className="crow">
							<div className="p-6">
								<InfoCard heading="Email" subHeading={loginData.email} color="pink" />
							</div>
							<div className="p-6">
								<InfoCard heading="Phone Number" subHeading={loginData.phoneNumber} color="pink"/>
							</div>
						</div>
					</Card>
					<div className="mb-2">
						<Divider />
					</div>
					<div className="crow">
						<Button
							onClick={() => {
								action.logOut();
							}}
							variant="outlined"
						>
							Logout
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default Profile;
