import AssetIndex from "@src/assets/AssetIndex";
import React, { useState } from "react";
import SidebarButton from "./components/SidebarButton";
import style from "./Sidebar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Spacer from "../Spacer/Spacer";
import DashBoardScreenPath from "@src/screens/Dashboard/ScreenPath.constant";
import CategoriesScreenPath from "@src/screens/Categories/ScreenPath.constant";

function Sidebar() {
	const [current, setCurrent] = useState(0);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<div className={style.container}>
			<Spacer height={40} />
			<div className="cc">
				<AssetIndex.LohawallaLogo />
			</div>
			<Spacer height={40} />
			<div className={style.buttonBox}>
				<SidebarButton
					activeIcon={<AssetIndex.DashboardActive />}
					inActiveIcon={<AssetIndex.DashboardInactive />}
					id={0}
					setActive={setCurrent}
					label={"Dashboard"}
					currentActive={current}
					onClick={() => navigate(DashBoardScreenPath())}
				/>
				<SidebarButton
					activeIcon={<AssetIndex.PlusActive />}
					inActiveIcon={<AssetIndex.PlusInactive />}
					id={1}
					setActive={setCurrent}
					label={"Add Base Price"}
					currentActive={current}
					onClick={() => navigate("/baseprice/")}
				/>
				<SidebarButton
					activeIcon={<AssetIndex.BuyActive />}
					inActiveIcon={<AssetIndex.BuyInactive />}
					id={2}
					setActive={setCurrent}
					label={"Category"}
					currentActive={current}
					onClick={() => navigate(CategoriesScreenPath())}
				/>
				<SidebarButton
					activeIcon={<AssetIndex.FolderActive />}
					inActiveIcon={<AssetIndex.FolderInactive />}
					id={3}
					setActive={setCurrent}
					label={"Companies"}
					currentActive={current}
					onClick={() => navigate("/company/")}
				/>
				<Spacer height={40} />
			</div>
		</div>
	);
}

export default Sidebar;
