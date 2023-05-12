import React, { useContext, useEffect, useState } from "react";
import UnAuthPage from "./components/UnAuthPage/UnAuthPage";

interface Props {
	children: React.ReactNode;
}

interface UserDetails {
	userId: string;
	name: string;
}

interface AuthProps {
	user: UserDetails;
	action: {
		logOut: () => void;
	};
}

const AuthGuardContext = React.createContext<AuthProps>({} as AuthProps);
export const useAuthGuardContext = () => useContext(AuthGuardContext);

export default function AuthGuard(props: Props) {
	const [userDetails, setUserDetails] = useState<UserDetails>({
		userId: "",
		name: "",
	});

	const [isLoggedIn, setIsLoggedIn] = useState(true);

	useEffect(() => {
		// TODO validate the token from the server
		const token = localStorage.getItem("token");
		if (true) {
			setUserDetails({
				userId: "645de63b96eeeca238a93975",
				name: "snehal",
			});
		}
	}, []);

	if (isLoggedIn) {
		return (
			<AuthGuardContext.Provider
				value={{
					user: userDetails,
					action: {
						logOut: () => {
							localStorage.removeItem("token");
							setIsLoggedIn(false);
						},
					},
				}}
			>
				{props.children}
			</AuthGuardContext.Provider>
		);
	} else {
		return <UnAuthPage />;
	}
}
