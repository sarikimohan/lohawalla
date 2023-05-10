import Backdrop from "@mui/material/Backdrop";
import SpacingDiv from "@src/Components/common/Layout/SpacingDiv/SpacingDiv";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import ErrorCard from "@src/Components/feedback/ErrorCard/ErrorCard";
import AddCategoryForm from "@src/forms/AddCategory/AddCategoryForm";
import AddCompany from "@src/forms/AddCompany/AddCompany";
import AddItem from "@src/forms/AddItem/AddItem";
import EditCategory from "@src/forms/EditCategory/EditCategory";
import React from "react";

function Dashboard() {
	return (
		<>
			<div>
				<SpacingDiv marginBottom={56}>
					<TitleNavBar title={"Dashboard"} />
				</SpacingDiv>
				<div>
					<AddCompany />
					{/* <AddItem /> */}
					{/* <AddCategoryForm /> */}
					{/* <ErrorCard messages={[]} /> */}
					{/* <EditCategory/> */}
					{/* <AddCategoryForm /> */}
				</div>
			</div>
		</>
	);
}

export default Dashboard;
