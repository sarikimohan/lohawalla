import React, { useContext, useEffect, useState } from "react";
import UnAuthPage from "./components/UnAuthPage/UnAuthPage";
import RoleIndex from "@src/modules/types/Roles.enum";

interface Props {
	children: React.ReactNode;
}

interface UserDetails {}

interface AuthProps {
	user: NameIdPair;
	action: {
		logOut: () => void;
	};
	loginData: LoginData
}
interface LoginData {
	success: boolean;
	userId: string;
	createdAt: Date;
	maxAge: Date;
	role: RoleIndex;
	token: string;
	name: string;
	email: string;
	phoneNumber: string;
}

const AuthGuardContext = React.createContext<AuthProps>({} as AuthProps);
export const useAuthGuardContext = () => useContext(AuthGuardContext);

export default function AuthGuard(props: Props) {
	const [userDetails, setUserDetails] = useState<UserDetails & NameIdPair>({
		userId: "",
		name: "",
	});

	const [state, setState] = useState<LoginData>({} as LoginData);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// TODO validate the token from the server
		const token = localStorage.getItem("userData");
		if (token) {
			const tokenObj = JSON.parse(token) as LoginData;

			setState(tokenObj);

			setIsLoggedIn(true);

			setUserDetails({
				userId: tokenObj.userId,
				name: tokenObj.name,
			});
		}
	}, []);

	if (isLoggedIn) {
		return (
			<AuthGuardContext.Provider
				value={{
					user: {
						userId: userDetails.userId,
						name: userDetails.name,
					},
					loginData: state,
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
