import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import FormHeader from "@src/Components/common/FormHeader/FormHeader";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import React, { useState } from "react";
import { InitialState } from "./managment/state/initialState";
import AddCategoryContext, {
	useAddCategoryContext,
} from "./managment/context/AddCategoryContext";
import FirstPart from "./parts/FirstPart/FirstPart";

function Mapper() {
	const { state } = useAddCategoryContext();

	return <>{state.page === 0 && <FirstPart />}</>;
}

function AddCategoryForm() {
	return (
		<AddCategoryContext>
			<PopUpContainer>
				<FormContainer>
					<div className="mb-4">
						<FormHeader
							navBack={() => {}}
							close={() => {}}
							heading={"Product"}
							preHeading={"ADD"}
						/>
					</div>

					<div className="mb-5">
						<ProgressBar currentStep={1} steps={3} />
					</div>
					<Mapper />
				</FormContainer>
			</PopUpContainer>
		</AddCategoryContext>
	);
}

export default AddCategoryForm;
