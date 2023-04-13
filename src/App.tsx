import React from "react";
import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import style from "./App.module.css";
import ScreenContainer from "./Components/common/Layout/ScreenContainer/ScreenContainer";
import Sidebar from "./Components/common/Sidebar/Sidebar";

function App() {
	return (
		<ScreenContainer>
			<div className={style.container + " d-flex"}>
				<div>
					<Sidebar />
				</div>
				<div></div>
			</div>
		</ScreenContainer>
	);
}

export default App;
