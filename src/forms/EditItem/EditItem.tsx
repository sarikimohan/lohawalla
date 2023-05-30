import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import FormHeader from "@src/Components/common/FormHeader/FormHeader";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import React, { useState, useEffect, useContext, useRef } from "react";
import FirstPart from "./parts/FirstPart/FirstPart";
import SecondPart from "./parts/SecondPart/SecondPart";
import ThirdPart from "./parts/ThirdPart/ThirdPart";
import EditItemActions from "./actions/EditItemActions";
import {
	SetHandle,
	SetHandleProps,
} from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

interface Props {}

interface ContextProps {
	id: string;
	state: EditItem.State;
	editItemFormActions: EditItemActions;
	handle: React.MutableRefObject<
		Record<
			string,
			{
				isValid: boolean;
				validate: () => Promise<void>;
			}
		>
	>;
	setHandle: (name: string) => SetHandle;
}

const EditItemContext = React.createContext({} as ContextProps);
export const useEditItemContext = () => useContext(EditItemContext);

export default function EditItem(props: Props) {
	const [state, setState] = useState<EditItem.State>({
		itemName: "",
		itemCode: "",
		itemHSNCode: "",
		description: "",
		images: [],
		imageFiles: [],
		margin: {
			cash: "",
			online: "",
		},
		descriptionLabels: [],
		loading: {
			saveData: AsyncStateFactory()
		},
		validation: true,
		triggerSubmit: false,
		validationCount: 0,
	});

	const id = "64759c847396139cf4094561";

	const editItemFormActions = new EditItemActions(state, setState);
	const handle = useRef<Record<string, SetHandleProps>>({});
	const setHandle = (name: string): SetHandle => {
		return (data: SetHandleProps) => {
			handle.current[name] = data;
		};
	};

	useEffect(() => {
		editItemFormActions.fetch(id);
	}, []);

	return (
		<EditItemContext.Provider
			value={{ state, editItemFormActions, handle, setHandle, id }}
		>
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
