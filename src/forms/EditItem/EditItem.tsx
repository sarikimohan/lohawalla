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
import ValueChange from "@src/modules/ValueChange/ValueChangeImpl";
import { PIUnitInput } from "@src/Components/special/UnitInput/UnitInput";
import AsyncProcessBoundary from "@src/Components/feedback/AsyncProcessBoundary/AsyncProcessBoundary";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";

interface Props {
	refresh: () => void;
	close: () => void;
	id: string;
}

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
	setUnitInput: (data: PIUnitInput.SetHandleProps) => void;
}

const EditItemContext = React.createContext({} as ContextProps);
export const useEditItemContext = () => useContext(EditItemContext);

export default function EditItem(props: Props) {
	const [state, setState] = useState<EditItem.State>({
		itemName: new ValueChange(""),
		itemCode: new ValueChange(""),
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
			saveData: AsyncStateFactory(),
			fetch: AsyncStateFactory(),
			fetchUnits: AsyncStateFactory(),
		},
		validation: true,
		triggerSubmit: false,
		validationCount: 0,
		unitList: [],
		unit: null,
	});

	const id = props.id;

	const editItemFormActions = new EditItemActions(state, setState);
	const handle = useRef<Record<string, SetHandleProps>>({});
	const unitInputHandle = useRef<PIUnitInput.SetHandleProps | null>(null);
	const setUnitInput = (data: PIUnitInput.SetHandleProps) => {
		unitInputHandle.current = data;
	};
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
			value={{
				state,
				editItemFormActions,
				handle,
				setHandle,
				id,
				setUnitInput,
			}}
		>
			<PopUpContainer>
				<AsyncProcessBoundary
					asyncStates={[state.loading.saveData, state.loading.fetchUnits]}
					primaryAction={{
						onClick: () => {
							props.close();
							props.refresh();
						},
						label: undefined,
					}}
				>
					<FormContainer>
						<div className="mb-5">
							<FormHeader
								navBack={function (): void {
									props.close();
								}}
								close={function (): void {
									props.close();
								}}
								heading={"Item"}
								preHeading={"Edit"}
							/>
						</div>
						<LoadingBoundary asyncState={state.loading.fetch}>
							<div>
								<FirstPart />
								<SecondPart />
								<ThirdPart />
							</div>
						</LoadingBoundary>
					</FormContainer>
				</AsyncProcessBoundary>
			</PopUpContainer>
		</EditItemContext.Provider>
	);
}
