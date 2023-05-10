import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React from "react";
import FirstPart from "./parts/FirstPart/FirstPart";
import { Divider } from "@mui/material";
import SecondPart from "./parts/SecondPart/SecondPart";

interface Props {}

export default function EditCategory(props: Props) {
	return (
		<PopUpContainer>
			<FormContainer>
				<div className="mb-5">
					<FormHeader
						navBack={function (): void {
							throw new Error("Function not implemented.");
						}}
						close={function (): void {
							throw new Error("Function not implemented.");
						}}
						heading={"Category"}
						preHeading={"Edit"}
					/>
				</div>

				<FirstPart />
				<Divider />
				<SecondPart/>
			</FormContainer>
		</PopUpContainer>
	);
}
