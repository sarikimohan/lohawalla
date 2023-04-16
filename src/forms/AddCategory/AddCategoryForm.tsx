import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import FormHeader from "@src/Components/common/FormHeader/FormHeader";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import React, { useState } from "react";
import { InitialState } from "./managment/state/initialState";

function AddCategoryForm() {

  const [state, setState] = useState(InitialState);

  

	return (
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


			</FormContainer>
		</PopUpContainer>
	);
}

export default AddCategoryForm;
