import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React, { useContext, useState } from "react";
import FirstPart from "./parts/FirstPart/FirstPart";
import { Divider } from "@mui/material";
import SecondPart from "./parts/SecondPart/SecondPart";
import ThirdPart from "./parts/ThirdPart/ThirdPart";
import InitialState from "./managment/state/initialState";
import EditCategoryActions from "./managment/actions/EditCategoryActions";
import DescriptionActions from "./managment/actions/DescriptionActions";
import CreditActions from "./managment/actions/CreditActions";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";

interface Props {}
interface ContextProps {
	state: EditCategory.State;
	editCategoryActions: EditCategoryActions;
	descriptionActions: DescriptionActions;
	creditActions: CreditActions;
}

const EditCategoryContext = React.createContext({} as ContextProps);
export const useEditCategoryContext = () => useContext(EditCategoryContext);

export default function EditCategory(props: Props) {
	const [state, setState] = useState(InitialState);
	const editCategoryActions = new EditCategoryActions(state, setState);
	const descriptionActions = new DescriptionActions(state, setState);
	const creditActions = new CreditActions(state, setState);

	return (
		<EditCategoryContext.Provider
			value={{
				state,
				editCategoryActions,
				descriptionActions,
				creditActions,
			}}
		>
			<PopUpContainer>
				<FormContainer>
					<div className="mb-5">
						<FormHeader
							navBack={function (): void {
								if (state.page > 0)
									editCategoryActions.mutateState((p) => p.page--);
							}}
							close={function (): void {
								// throw new Error("Function not implemented.");
							}}
							heading={"Category"}
							preHeading={"Edit"}
						/>
					</div>

					<FirstPart />
					<div className="my-5">
						<Divider />
					</div>
					<SecondPart />
					<div className="my-5">
						<Divider />
					</div>
					<ThirdPart />
					<div className="my-5">
						<DefaultButton
							onClick={function () {
								const verdict = editCategoryActions.validateForm();
								if (verdict) {
									console.log("okay");
								}
							}}
							label={"Save"}
						/>
					</div>
				</FormContainer>
			</PopUpContainer>
		</EditCategoryContext.Provider>
	);
}
