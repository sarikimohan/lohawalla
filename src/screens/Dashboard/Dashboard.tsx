import Backdrop from "@mui/material/Backdrop";
import SpacingDiv from "@src/Components/common/Layout/SpacingDiv/SpacingDiv";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import ErrorCard from "@src/Components/feedback/ErrorCard/ErrorCard";
import AddCategoryForm from "@src/forms/AddCategory/AddCategoryForm";
import React from "react";

function Dashboard() {
	return (
		<>
			<div>
				<SpacingDiv marginBottom={56}>
					<TitleNavBar title={"Dashboard"} />
				</SpacingDiv>
				<div>
					<AddCategoryForm/>
					{/* <ErrorCard messages={[]} /> */}
				</div>
			</div>
		</>
	);
}

export default Dashboard;
