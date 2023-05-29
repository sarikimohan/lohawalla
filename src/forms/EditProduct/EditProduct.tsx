import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React from "react";

export interface RIEditProduct {}

export namespace PIEditProduct {}

export default function EditProduct(props: RIEditProduct) {
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
					<ProgressBar currentStep={0} steps={3} />
				</div>
			</FormContainer>
		</PopUpContainer>
	);
}
