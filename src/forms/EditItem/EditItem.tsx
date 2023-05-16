import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import FormHeader from "@src/Components/common/FormHeader/FormHeader";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import React, { useState, useEffect, useContext } from "react";
import FirstPart from "./parts/FirstPart/FirstPart";
import SecondPart from "./parts/SecondPart/SecondPart";
import ThirdPart from "./parts/ThirdPart/ThirdPart";
import { FieldDataService } from "@src/modules/FieldData/FieldData";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import EditItemActions from "./actions/EditItemActions";

interface Props {}

interface ContextProps {
	state: EditItem.State;
	editItemFormActions: EditItemActions;
}

const EditItemContext = React.createContext({} as ContextProps);
export const useEditItemContext = () => useContext(EditItemContext);

export default function EditItem(props: Props) {
	const [state, setState] = useState<EditItem.State>({
		itemName: FieldDataService.getDefaultField(),
		itemCode: FieldDataService.getDefaultField(),
		itemHSNCode: FieldDataService.getDefaultField(),
		description: FieldDataService.getDefaultField(),
		images: [],
		imageFiles: [],
		margin: {
			cash: FieldDataService.getDefaultField(),
			online: FieldDataService.getDefaultField(),
		},
		descriptionLabels: [],
		loading: {
			fetch: AsyncStateFactory(),
		},
		validation: {
			descriptionLabels: true,
			form: true,
		},
		triggerSubmit: false,
	});

	const editItemFormActions = new EditItemActions(state, setState);

	useEffect(() => {
		editItemFormActions.fetch("64630eec98b7520d1b4abdc3");
	}, []);

	return (
		<EditItemContext.Provider value={{ state, editItemFormActions }}>
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
		</EditItemContext.Provider>
	);
}
