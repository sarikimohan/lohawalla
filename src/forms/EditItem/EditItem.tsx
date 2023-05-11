import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import FormHeader from "@src/Components/common/FormHeader/FormHeader";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import React from "react";
import FirstPart from "./parts/FirstPart/FirstPart";
import SecondPart from "./parts/SecondPart/SecondPart";
import ThirdPart from "./parts/ThirdPart/ThirdPart";

interface Props {}

export default function EditItem(props: Props) {
	return (
		<PopUpContainer>
			<FormContainer>
				<div className="mb-5">
					<FormHeader
						navBack={function (): void {}}
						close={function (): void {}}
						heading={"Item"}
						preHeading={"Edit"}
					/>
				</div>
				<div>
					<FirstPart />
					<SecondPart />
					<ThirdPart />
				</div>
			</FormContainer>
		</PopUpContainer>
	);
}
