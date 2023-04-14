import React from "react";
import { Route, Routes } from "react-router-dom";
import style from "./App.module.css";
import ScreenContainer from "./Components/common/Layout/ScreenContainer/ScreenContainer";
import Sidebar from "./Components/common/Sidebar/Sidebar";
import DashBoardScreenPath from "./screens/Dashboard/ScreenPath.constant";
import CategoriesScreenPath from "./screens/Categories/ScreenPath.constant";

//* screen imports
const LazyDashboard = React.lazy(() => import("./screens/Dashboard/Dashboard"));

function App() {
	return (
		<ScreenContainer>
			<div className={style.container + " d-flex"}>
				<div>
					<Sidebar />
				</div>
				<div>
					<Routes>
						<Route path={DashBoardScreenPath()}>
							<Route
								index
								element={
									<React.Suspense fallback="loading...">
										<LazyDashboard />
									</React.Suspense>
								}
							/>
						</Route>
						<Route path={CategoriesScreenPath()}>{/* <Route index /> */}</Route>
					</Routes>
				</div>
			</div>
		</ScreenContainer>
	);
}

export default App;
