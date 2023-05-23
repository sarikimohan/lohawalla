import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";
import ValidatedEntry, {
	SetHandle,
	SetHandleProps,
} from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import React, { useState, useRef } from "react";
import AddUnitActions from "./actions/AddUnitActions";
import checkNameUnique from "./fetch/services/checkNameUnique";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";

interface Props {
	refresh: () => void;
	close: () => void;
}

export default function AddUnit(props: Props) {
	const [state, setState] = useState<StateWithLoading<AddUnit.State>>({
		unitName: "",
		unitWeight: "",
		loading: {
			save: AsyncStateFactory(),
		},
	});

	const addUnitActions = new AddUnitActions(state, setState);
	const handle = useRef<Record<string, SetHandleProps>>({});
	const setHandle = (name: string) => {
		const fn: SetHandle = (d) => {
			handle.current[name] = d
		};
		return fn;
	};

	const save = async () => {
		for (let i of Object.values(handle.current)) {
			await i.validate();
		}
		const verdict = Object.values(handle.current).reduce(
			(a, c) => a && c.isValid,
			true
		);
		if (verdict) {
			await addUnitActions.save();
		}
	};

	return (
		<PopUpContainer>
			<LoadingBoundary asyncState={state.loading.save}>
				<FormContainer>
					<div className="mb-8">
						<FormHeader
							navBack={function (): void {
								props.close();
							}}
							close={function (): void {
								props.close();
							}}
							heading={"Unit"}
							preHeading={"Add"}
						/>
					</div>
					<div className="mb-12">
						<div className="mb-3">
							<DefaultFormLabel className="mb-3">
								Enter Name of unit
							</DefaultFormLabel>
							<ValidatedEntry
								onChange={function (e: string): void {
									addUnitActions.setName(e);
								}}
								value={state.unitName}
								placeHolder="unit name"
								validateFunction={(d) =>
									FieldDataService.registerValidator(
										d,
										{ isValid: true },
										Validators.validateNull
									)
								}
								asyncValidator={async (d) => {
									const res = await checkNameUnique(d);
									if (!res.data) return d + " already exists";
								}}
								setHandle={setHandle("name")}
							/>
						</div>
						<div className="mb-3">
							<DefaultFormLabel className="mb-3">
								Enter Weight of Unit
							</DefaultFormLabel>
							<ValidatedEntry
								onChange={function (e: string): void {
									addUnitActions.setWeight(e);
								}}
								value={state.unitWeight}
								placeHolder="unit weight"
								type="number"
								setHandle={setHandle("weight")}
							/>
						</div>
					</div>
					<DefaultButton
						onClick={function (): void {
							save();
						}}
						label={"Save"}
					/>
				</FormContainer>
			</LoadingBoundary>
		</PopUpContainer>
	);
}
