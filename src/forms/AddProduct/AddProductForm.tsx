import React, { useEffect, useState } from "react";
import FormPart1 from "./parts/FormPart1/FormPart1";
import FormPart2 from "./parts/FormPart2/FormPart2";
import FormPart3 from "./parts/FormPart3/FormPart3";
import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import FormHeader from "@src/Components/common/FormHeader/FormHeader";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import InitialState from "./management/state/InitialState";

interface AddProductFormInterface {
	company?: { _id: string; companyName: string };
	item?: { _id: string; name: string };
	categories?: { _id: string; categoryName: string };
}

function AddProductForm() {
	const [state, setState] = useState<AddProduct.State>(InitialState);
	const { page } = state;
	return (
		<PopUpContainer>
			<FormContainer>
				<div className="mb-4">
					<FormHeader
						navBack={() => {}}
						heading={"Product"}
						preHeading={"ADD"}
						close={function (): void {
							throw new Error("Function not implemented.");
						}}
					/>
				</div>
				<div className="mb-5">
					<ProgressBar currentStep={page + 1} steps={3} />
				</div>
				<div>
					{page === 0 && <FormPart1 />}
					{page === 1 && <FormPart2 />}
					{page === 2 && <FormPart3 />}
				</div>
			</FormContainer>
		</PopUpContainer>
	);
}

export default AddProductForm;
