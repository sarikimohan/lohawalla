import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React, { useContext, useRef, useState } from "react";
import FirstPart from "./parts/FirstPart/FirstPart";
import { Divider } from "@mui/material";
import SecondPart from "./parts/SecondPart/SecondPart";
import ThirdPart from "./parts/ThirdPart/ThirdPart";
import InitialState from "./managment/state/initialState";
import EditCategoryActions from "./managment/actions/EditCategoryActions";
import DescriptionActions from "./managment/actions/DescriptionActions";
import CreditActions from "./managment/actions/CreditActions";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import ValidatedEntry, {
	SetHandle,
} from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { SetHandleProps } from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { PIUnitInput } from "./parts/FirstPart/components/UnitInput/UnitInput";

interface Props {}
interface ContextProps {
	state: EditCategory.State;
	editCategoryActions: EditCategoryActions;
	descriptionActions: DescriptionActions;
	creditActions: CreditActions;
	setInputHandle: (name: string) => SetHandle;
	setCreditHandle: (name: string) => SetHandle;
	setUnitHandle: PIUnitInput.SetHandle;
}

const EditCategoryContext = React.createContext({} as ContextProps);
export const useEditCategoryContext = () => useContext(EditCategoryContext);

export default function EditCategory(props: Props) {
	const [state, setState] = useState(InitialState);
	const editCategoryActions = new EditCategoryActions(state, setState);
	const descriptionActions = new DescriptionActions(state, setState);
	const creditActions = new CreditActions(state, setState);

	const inputRef = useRef<{
		plainFields: Record<string, SetHandleProps>;
		credit: Record<string, SetHandleProps>;
		unitInput: PIUnitInput.SetHandleProps;
	}>({
		plainFields: {},
		credit: {},
		unitInput: {} as PIUnitInput.SetHandleProps,
	});

	const setInputHandle = (name: string) => (d: SetHandleProps) => {
		inputRef.current.plainFields[name] = d;
	};
	const setCreditHandle = (name: string) => (d: SetHandleProps) => {
		inputRef.current.credit[name] = d;
	};
	const setUnitHandle: PIUnitInput.SetHandle = (d) => {
		inputRef.current.unitInput = d;
	};

	const validate = async () => {
		// triggering the form validation
		const current = inputRef.current;
		let verdict = true;

		for (let i of Object.values(current.plainFields)) {
			await i.validate();
		}
		for (let i of Object.values(current.credit)) {
			await i.validate();
		}
		current.unitInput.validate();

		// returning the validation verdict
		verdict &&= Object.values(current.plainFields).reduce((a, c) => a&&c.isValid, true);
		verdict &&= Object.values(current.credit).reduce((a, c) => a && c.isValid, true);
		verdict &&= current.unitInput.isValid;
		
		return verdict;
	};

	return (
		<EditCategoryContext.Provider
			value={{
				state,
				editCategoryActions,
				descriptionActions,
				setInputHandle,
				setCreditHandle,
				creditActions,
				setUnitHandle,
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
								// const verdict = editCategoryActions.validateForm();
								// if (verdict) {
								// 	console.log("okay");
								// }
								validate().then((d) => {
									console.log(d);
								});
							}}
							label={"Save"}
						/>
					</div>
				</FormContainer>
			</PopUpContainer>
		</EditCategoryContext.Provider>
	);
}
