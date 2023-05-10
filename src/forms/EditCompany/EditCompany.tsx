import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React from "react";
import FirstPart from "../AddItem/parts/FirstPart/FirstPart";
import { Divider } from "@mui/material";
import SecondPart from "./parts/SecondPart/SecondPart";
import ThirdPart from "./parts/ThirdPart/ThirdPart";

interface Props {}

export default function EditCompany(props: Props) {
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
						heading={"Company"}
						preHeading={"Edit"}
					/>
				</div>
				<div>
					<FirstPart />
					<div className="my-5">
						<Divider />
					</div>
					<SecondPart />
					<div className="my-5">
						<Divider />
					</div>
					<ThirdPart />
				</div>
			</FormContainer>
		</PopUpContainer>
	);
}
