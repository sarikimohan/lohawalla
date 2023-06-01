import FormContainer from "@src/Components/common/FormContainer/FormContainer";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React, { useContext, useRef, useState } from "react";
import { Divider } from "@mui/material";
import SecondPart from "./parts/SecondPart/SecondPart";
import ThirdPart from "./parts/ThirdPart/ThirdPart";
import FirstPart from "./parts/FirstPart/FirstPart";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import { ImageIndex } from "@src/assets/AssetIndex";
import {
	SetHandle,
	SetHandleProps,
} from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import { nanoid } from "nanoid";

export enum Groups {
	plain = "plain",
	priceField = "priceField",
	descriptions = "descriptions",
	descEntry = "descEntry",
}

interface Props {}

interface ContextProps {
	state: EditCompany.State;
	setHandle: (gname: string, pname: string) => SetHandle;
	deleteHandle: (gname: string, pname: string) => void;
	stateUtils: StateUtils<EditCompany.State>;
	addDesc: () => Promise<void>;
}
const EditCompanyContext = React.createContext({} as ContextProps);
export const useEditCompanyContext = () => useContext(EditCompanyContext);

export default function EditCompany(props: Props) {
	const handle = useRef<Record<string, Record<string, SetHandleProps>>>({
		[Groups.plain]: {},
		[Groups.priceField]: {},
		[Groups.descEntry]: {},
		[Groups.descriptions]: {},
	});
	const setHandle = (gname: string, pname: string) => {
		return (d: SetHandleProps) => {
			handle.current[gname][pname] = d;
		};
	};
	const deleteHandle = (gname: string, pname: string) => {
		delete handle.current[gname][pname];
	};
	const addDesc = async () => {
		const keyHandle = handle.current[Groups.descEntry].key;
		const valueHandle = handle.current[Groups.descEntry].value;

		await keyHandle.validate();
		await valueHandle.validate();

		const verdict = keyHandle.isValid && valueHandle.isValid;

		if (verdict) {
			stateUtils.mutateState((p) => {
				p.descriptionLabels.push({
					id: nanoid(),
					key: state.descriptionEntry.key,
					value: state.descriptionEntry.value,
					position: -1,
				});
				p.descriptionEntry.key = "";
				p.descriptionEntry.value = "";
			});
		}
	};

	const validate = async () => {
		// basic
		for (let i of Object.values(handle.current[Groups.plain])) {
			await i.validate();
		}
		// price fields
		for (let i of Object.values(handle.current[Groups.descriptions])) {
			await i.validate();
		}
		// global fields
		for (let i of Object.values(handle.current[Groups.priceField])) {
			await i.validate();
		}

		// basic
		const v1 = Object.values(handle.current[Groups.plain]).reduce(
			(a, c) => a && c.isValid,
			true
		);
		// price field
		const v2 = Object.values(handle.current[Groups.descriptions]).reduce(
			(a, c) => a && c.isValid,
			true
		);
		// global fields
		const v3 = Object.values(handle.current[Groups.priceField]).reduce(
			(a, c) => a && c.isValid,
			true
		);

		return v1 && v2 && v3;
	};

	const [state, setState] = useState<EditCompany.State>({
		companyName: "",
		description: "",
		images: [],
		priceStructure: [
			{
				_id: "",
				name: "basic rate",
				value: "200",
				isFixed: true,
				position: 0,
				type: "numeric",
				operation: "add",
			},
		],
		deletedId: [],
		descriptionLabels: [],
		descriptionEntry: {
			key: "",
			value: "",
		},
		tempPriceFields: [
			{
				id: nanoid(),
				name: { value: "" },
				type: "percentage",
				operation: "add",
			},
		],
	});
	const stateUtils = new StateUtils<EditCompany.State>(state, setState);
	return (
		<EditCompanyContext.Provider
			value={{ setHandle, state, deleteHandle, stateUtils, addDesc }}
		>
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
					<div className="mt-5">
						<DefaultButton
							onClick={function (): void {
								validate();
							}}
							label={"SAVE"}
						/>
					</div>
				</FormContainer>
			</PopUpContainer>
		</EditCompanyContext.Provider>
	);
}
