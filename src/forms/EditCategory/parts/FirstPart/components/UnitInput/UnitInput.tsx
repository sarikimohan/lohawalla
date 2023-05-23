import { Autocomplete, TextField } from "@mui/material";
import Spacer from "@src/Components/common/Spacer/Spacer";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import React, { useEffect, useState } from "react";

interface Unit {
	id: string;
	name: string;
	weight: number;
}

export interface RIUnitInput {
	unitList: Unit[];
	value: Unit | null;
	setHandle: PIUnitInput.SetHandle;
}

export namespace PIUnitInput {
	export interface SetHandleProps {
		value: Unit | null;
		weightInputValue: string;
		isValid: boolean;
		validate: () => void;
	}
	export type SetHandle = (data: SetHandleProps) => void;
}

/*
LOGIC 

whenever the value is selected then show the input field
if the vlaue is not -1 then show the field with disabled value
else show the input field with the default value and then make that field editable 

validation will follow as the input value must be valid 
*/

export default function UnitInput(props: RIUnitInput) {
	//* defining the states
	const [selectedUnit, setSelectedUnit] = useState<Unit | null>(props.value);
	const [inputValue, setInputValue] = useState<FieldData>({ value: "" });

	useEffect(() => {
		setSelectedUnit(props.value);
	}, [props.value]);

	useEffect(() => {
		props.setHandle({
			value: selectedUnit,
			weightInputValue: "",
			isValid: true,
			validate,
		});
	}, []);

	const validate = () => {
		// validate the value
		const verdict = { isValid: true };
		if (selectedUnit && selectedUnit.weight === -1) {
			inputValue.error = FieldDataService.registerValidator(
				inputValue.value,
				verdict,
				Validators.validateNull,
				Validators.validateFloat,
				(d) => Validators.min(d, 0)
			);
			inputValue.isValid = !inputValue.error;

			setInputValue({ ...inputValue });
		}
		props.setHandle({
			value: selectedUnit,
			weightInputValue: inputValue.value,
			isValid: verdict.isValid,
			validate,
		});
	};

	return (
		<>
			<Autocomplete<Unit>
				getOptionLabel={(d) => d.name}
				renderInput={(params) => (
					<TextField error={undefined} {...params} label="Unit" />
				)}
				options={props.unitList}
				onOpen={() => {}}
				onChange={(e, val) => {
					setSelectedUnit(val);
				}}
				onInputChange={(e, v, r) => {
					if (r === "clear") {
						setSelectedUnit(null);
					}
				}}
				loading={false}
				clearOnEscape
				isOptionEqualToValue={(o, v) => o.id === v.id}
				value={selectedUnit}
			/>
			<Spacer height={20} />
			{selectedUnit && selectedUnit.weight === -1 && (
				<>
					<p className="body fw-medium fcolor-fuschia">
						{"Enter " + selectedUnit.name + " weight"}
					</p>
					<FieldInput
						type="number"
						onChange={(d) => {}}
						width={"100%"}
						placeHolder={`${selectedUnit.name} weight in kg`}
						name="description"
					/>
				</>
			)}
			{selectedUnit && selectedUnit.weight !== -1 && (
				<>
					<p className="body fw-medium fcolor-fuschia">Unit weight is</p>
					<FieldInput
						type="number"
						value={selectedUnit.weight.toString()}
						onChange={(d) => {}}
						width={"100%"}
						placeHolder={`Enter ${selectedUnit.name} weight`}
						name="description"
						disabled
					/>
				</>
			)}
		</>
	);
}
