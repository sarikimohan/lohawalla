import Backdrop from "@mui/material/Backdrop";
import SpacingDiv from "@src/Components/common/Layout/SpacingDiv/SpacingDiv";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import ErrorCard from "@src/Components/feedback/ErrorCard/ErrorCard";
import AuthGuard from "@src/auth/AuthGuard/AuthGuard";
import AddCategoryForm from "@src/forms/AddCategory/AddCategoryForm";
import AddCompany from "@src/forms/AddCompany/AddCompany";
import AddItem from "@src/forms/AddItem/AddItem";
import AddProductForm from "@src/forms/AddProduct/AddProductForm";
import EditCategory from "@src/forms/EditCategory/EditCategory";
import EditCompany from "@src/forms/EditCompany/EditCompany";
import EditItem from "@src/forms/EditItem/EditItem";
import React from "react";

function Dashboard() {
	return (
		<>
			<div>
				<SpacingDiv marginBottom={56}>
					<TitleNavBar title={"Dashboard"} />
				</SpacingDiv>
				<div>
					{/* <AddProductForm /> */}
					<AddCompany />
					{/* <AddItem /> */}
					{/* <AddCategoryForm /> */}
					{/* <ErrorCard messages={[]} /> */}
					{/* <EditCategory/> */}
					{/* <AddCategoryForm /> */}
					{/* <EditCompany/> */}
					{/* <EditItem /> */}
				</div>
			</div>
		</>
	);
}

export default Dashboard;
