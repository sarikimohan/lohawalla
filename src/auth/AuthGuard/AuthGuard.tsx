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
	loginData: LoginData;
}
interface LoginData {
	success: boolean;
	userId: string;
	createdAt: number;
	maxAge: number;
	role: RoleIndex;
	token: string;
	name: string;
	email: string;
	phoneNumber: string;
}

const AuthGuardContext = React.createContext<AuthProps>({} as AuthProps);
export const useAuthGuardContext = () => useContext(AuthGuardContext);

function getToken() {
	const token = window.localStorage.getItem("userData");
	if (!token) return null;
	return JSON.parse(token) as LoginData;
}

export default function AuthGuard(props: Props) {
	const [userDetails, setUserDetails] = useState<UserDetails & NameIdPair>({
		userId: "",
		name: "",
	});

	const [state, setState] = useState<LoginData>({} as LoginData);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// TODO validate the token from the server
		const tokenObj = getToken();
		if (
			tokenObj &&
			(tokenObj.role === RoleIndex.ADMIN || tokenObj.role === RoleIndex.SALES)
		) {
			if (tokenObj.createdAt < Date.now()) {
				localStorage.removeItem("userData");
			} else {
				setTimeout(() => {
					localStorage.removeItem("userData");
				}, Date.now() - tokenObj.createdAt);
			}

			setState(tokenObj);

			setIsLoggedIn(true);

			setUserDetails({
				userId: tokenObj.userId,
				name: tokenObj.name,
			});
		}

		// setUserDetails({
		// 	userId: "646cee6bcd9d75a02a8172f6",
		// 	name: "snehal",
		// });
	}, []);

	useEffect(() => {
		const tokenObj = getToken();
		if (
			!tokenObj ||
			(tokenObj.role !== RoleIndex.ADMIN && tokenObj.role !== RoleIndex.SALES)
		) {
			setIsLoggedIn(false);
		}
	});

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
