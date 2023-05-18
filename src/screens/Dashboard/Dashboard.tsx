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
import SetActiveCompany from "@src/forms/SetActiveCompany/SetActiveCompany";
import React from "react";

function Dashboard() {
	return (
		<>
			<div>
				<SpacingDiv marginBottom={56}>
					<TitleNavBar title={"Dashboard"} />
				</SpacingDiv>
				<div>
					{/* <AddCategoryForm
						onClose={function (): void {
							throw new Error("Function not implemented.");
						}}
						refresh={() => {}}
					/> */}
					<AddProductForm />
					{/* <AddCompany /> */}
					{/* <AddItem /> */}
					{/* <AddCategoryForm /> */}
					{/* <ErrorCard messages={[]} /> */}
					{/* <EditCategory/> */}
					{/* <EditCompany/> */}
					{/* <EditItem /> */}
					{/* <SetActiveCompany/> */}
				</div>
			</div>
		</>
	);
}

export default Dashboard;
