import { Autocomplete, TextField } from "@mui/material";
import Spacer from "@src/Components/common/Spacer/Spacer";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import { FieldDataService, Validators } from "@src/modules/FieldData/FieldData";
import React, { useEffect, useState } from "react";

interface Unit extends BaseUnit {
	value: FieldData;
}

interface BaseUnit {
	_id: string;
	name: string;
	weight: number | null;
}

interface UnitWithoutInput extends BaseUnit {
	value: string;
}

export interface RIUnitInput {
	unitList: BaseUnit[];
	value: {
		_id: string;
		name: string;
		weight: number | null;
		value: string | null;
	} | null;
	setHandle: PIUnitInput.SetHandle;
	onOpen?: () => void;
	onChange?: (unit: Unit) => void;
}

export namespace PIUnitInput {
	export interface SetHandleProps {
		value: UnitWithoutInput | null;
		// weightInputValue: string;
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
	const [selectedUnit, setSelectedUnit] = useState<Unit | null>(
		props.value
			? {
					_id: props.value._id,
					name: props.value.name,
					weight: props.value.weight,
					value: props.value?.value
						? FieldDataService.getDefaultField(props.value.value.toString())
						: FieldDataService.getDefaultField(),
			  }
			: null
	);
	const [unitList, setUnitList] = useState<Unit[]>(
		props.unitList.map((v) => ({
			...v,
			value: FieldDataService.getDefaultField(),
		}))
	);
	const [inputValue, setInputValue] = useState<FieldData>({ value: "" });

	useEffect(() => {
		setUnitList(
			props.unitList.map((v) => ({
				...v,
				value: FieldDataService.getDefaultField(),
			}))
		);
	}, [props.unitList]);

	useEffect(() => {
		setSelectedUnit(
			props.value
				? {
						_id: props.value._id,
						name: props.value.name,
						weight: props.value.weight,
						value: props.value?.value
							? FieldDataService.getDefaultField(props.value.value.toString())
							: FieldDataService.getDefaultField(),
				  }
				: null
		);
	}, [props.value]);

	useEffect(() => {
		props.setHandle({
			value: selectedUnit
				? { ...selectedUnit, value: selectedUnit.value.value }
				: null,
			// weightInputValue: inputValue.value,
			isValid: true,
			validate,
		});
	}, [selectedUnit, inputValue]);

	const validate = () => {
		// validate the value
		const verdict = { isValid: true };
		if (selectedUnit && selectedUnit.weight === null) {
			const data = { ...selectedUnit };
			data.value.error = FieldDataService.registerValidator(
				data.value.value,
				verdict,
				Validators.validateNull,
				Validators.validateFloat,
				(d) => Validators.min(d, 0)
			);
			data.value.isValid = !data.value.error;

			setSelectedUnit(data);
		}
		props.setHandle({
			value: selectedUnit
				? { ...selectedUnit, value: selectedUnit.value.value }
				: null,
			// weightInputValue: inputValue.value,
			isValid: verdict.isValid,
			validate,
		});
	};

	console.log(unitList, selectedUnit);

	return (
		<>
			<Autocomplete<Unit>
				getOptionLabel={(d) => d.name}
				renderInput={(params) => (
					<TextField error={undefined} {...params} label="Unit" />
				)}
				options={unitList}
				onOpen={() => {
					props.onOpen;
				}}
				onChange={(e, val) => {
					setSelectedUnit(val);
					val && props.onChange && props.onChange(val);
				}}
				onInputChange={(e, v, r) => {
					if (r === "clear") {
						setSelectedUnit(null);
					}
				}}
				loading={false}
				clearOnEscape
				isOptionEqualToValue={(o, v) => o._id === v._id}
				value={selectedUnit}
			/>
			<Spacer height={20} />
			{selectedUnit && !selectedUnit.weight && (
				<>
					<p className="body fw-medium fcolor-fuschia">
						{"Enter " + selectedUnit?.name + " weight"}
					</p>
					<FieldInput
						{...selectedUnit.value}
						type="number"
						onChange={(d) => {
							setSelectedUnit((p) =>
								p ? { ...p, value: { value: d.target.value } } : null
							);
							if (selectedUnit) {
								const newVal = { ...selectedUnit };
								newVal.weight = parseFloat(d.target.value);
								props.onChange && props.onChange(newVal);
							}
						}}
						width={"100%"}
						placeHolder={`${selectedUnit?.name} weight in kg`}
						name="description"
					/>
				</>
			)}
			{selectedUnit && selectedUnit.weight && (
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
