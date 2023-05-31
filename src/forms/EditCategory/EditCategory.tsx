import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React, { useContext, useEffect, useRef, useState } from "react";
import FirstPart from "./parts/FirstPart/FirstPart";
import { Divider } from "@mui/material";
import SecondPart from "./parts/SecondPart/SecondPart";
import ThirdPart from "./parts/ThirdPart/ThirdPart";
import EditCategoryActions from "./managment/actions/EditCategoryActions";
import DescriptionActions from "./managment/actions/DescriptionActions";
import CreditActions from "./managment/actions/CreditActions";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import ValidatedEntry, {
	SetHandle,
} from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { SetHandleProps } from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { PIUnitInput } from "./parts/FirstPart/components/UnitInput/UnitInput";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import { nanoid } from "nanoid";
import ServerActions from "./managment/actions/ServerActions";
import { useAuthGuardContext } from "@src/auth/AuthGuard/AuthGuard";
import AsyncProcessBoundary from "@src/Components/feedback/AsyncProcessBoundary/AsyncProcessBoundary";

interface Props {}
interface ContextProps {
	state: EditCategory.State;
	editCategoryActions: EditCategoryActions;
	descriptionActions: DescriptionActions;
	creditActions: CreditActions;
	setInputHandle: (name: string) => SetHandle;
	setCreditHandle: (name: string) => SetHandle;
	setDescHandle: (name: string) => SetHandle;
	setCredInputHandle: (name: string) => SetHandle;
	setDescInputHandle: (name: string) => SetHandle;
	setUnitHandle: PIUnitInput.SetHandle;
	validateAdd: () => Promise<void>;
	validateAddDesc: () => Promise<void>;
}

export interface Handle {
	plainFields: Record<string, SetHandleProps>;
	credit: Record<string, SetHandleProps>;
	unitInput: PIUnitInput.SetHandleProps;
	descRef: Record<string, SetHandleProps>;
	descInput: Record<string, SetHandleProps>;
	creditInput: Record<string, SetHandleProps>;
}

const EditCategoryContext = React.createContext({} as ContextProps);
export const useEditCategoryContext = () => useContext(EditCategoryContext);

export default function EditCategory(props: Props) {
	const [state, setState] = useState<EditCategory.State>({
		page: 0,
		categoryName: "",
		categoryCode: "",
		description: "",
		images: [],
		imageFiles: [],
		credit: [],
		creditInput: {
			key: "",
			value: "",
		},
		descriptionLabels: [],
		descriptionEntry: {
			key: "",
			value: "",
		},
		loading: {
			saveImages: AsyncStateFactory(),
			saveData: AsyncStateFactory(),
			fetchForm: AsyncStateFactory(),
		},
		negotiation: "",
	});

	const id = "64771643a9e44cf4400146c4";

	const inputRef = useRef<Handle>({
		plainFields: {},
		credit: {},
		unitInput: {} as PIUnitInput.SetHandleProps,
		descRef: {},
		creditInput: {},
		descInput: {},
	});

	const editCategoryActions = new EditCategoryActions(state, setState);
	const descriptionActions = new DescriptionActions(state, setState);
	const creditActions = new CreditActions(state, setState);
	const serverActions = new ServerActions(state, setState, inputRef);

	const { user } = useAuthGuardContext();

	useEffect(() => {
		serverActions.inflate(id);
	}, []);

	const setInputHandle = (name: string) => (d: SetHandleProps) => {
		inputRef.current.plainFields[name] = d;
	};
	const setCreditHandle = (name: string) => (d: SetHandleProps) => {
		inputRef.current.credit[name] = d;
	};
	const setUnitHandle: PIUnitInput.SetHandle = (d) => {
		inputRef.current.unitInput = d;
	};
	const setDescHandle = (name: string) => (d: SetHandleProps) => {
		inputRef.current.descRef[name] = d;
	};
	const setDescInputHandle = (name: string) => (d: SetHandleProps) => {
		inputRef.current.descInput[name] = d;
	};
	const setCredInputHandle = (name: string) => (d: SetHandleProps) => {
		inputRef.current.creditInput[name] = d;
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

		for (let i of Object.values(current.descRef)) {
			await i.validate();
		}

		// returning the validation verdict
		verdict &&= Object.values(current.plainFields).reduce(
			(a, c) => a && c.isValid,
			true
		);
		verdict &&= Object.values(current.credit).reduce(
			(a, c) => a && c.isValid,
			true
		);
		verdict &&= current.unitInput.isValid;
		verdict &&= Object.values(current.descRef).reduce(
			(a, c) => a && c.isValid,
			true
		);

		return verdict;
	};

	const validateAdd = async () => {
		const handleKey = inputRef.current.creditInput["credit-key"];
		const handleValue = inputRef.current.creditInput["credit-value"];

		await handleKey.validate();
		await handleValue.validate();

		const verdict = handleKey.isValid && handleValue.isValid;

		if (verdict)
			editCategoryActions.mutateState((p) => {
				const key = p.creditInput.key;
				const value = p.creditInput.value;

				p.credit.push({
					id: nanoid(),
					days: parseInt(key.trim()),
					value: value.trim(),
					type: "percentage",
				});
				p.creditInput.key = "";
				p.creditInput.value = "";
			});
	};

	const validateAddDesc = async () => {
		const handleKey = inputRef.current.descInput["desc-input-key"];
		const handleValue = inputRef.current.descInput["desc-input-value"];

		await handleKey.validate();
		await handleValue.validate();

		const verdict = handleKey.isValid && handleValue.isValid;

		if (verdict) {
			editCategoryActions.mutateState((p) => {
				p.descriptionLabels.push({
					id: nanoid(),
					key: p.descriptionEntry.key.trim(),
					value: p.descriptionEntry.value.trim(),
				});
				p.descriptionEntry.key = "";
				p.descriptionEntry.value = "";
			});
		}
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
				validateAdd,
				setDescHandle,
				validateAddDesc,
				setDescInputHandle,
				setCredInputHandle,
			}}
		>
			<PopUpContainer>
				<AsyncProcessBoundary
					asyncStates={[state.loading.saveImages, state.loading.saveData]}
					primaryAction={{
						onClick: () => {},
						label: undefined,
					}}
				>
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
									validate().then((d) => {
										serverActions.save(id, user);
									});
								}}
								label={"Save"}
								loading={
									state.loading.saveData.status === "initialized" ||
									state.loading.saveImages.status === "initialized"
								}
								loadingColor={"white"}
							/>
						</div>
					</FormContainer>
				</AsyncProcessBoundary>
			</PopUpContainer>
		</EditCategoryContext.Provider>
	);
}
