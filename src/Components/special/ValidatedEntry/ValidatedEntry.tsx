import React, { useState, useEffect, forwardRef } from "react";
import FieldInput from "../../forms/FieldInput/FieldInput";

interface Props {
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	onChange: (e: string) => void;
	value: string;
	validateFunction?: (d: string) => string | undefined;
	onValidation?: (isValid: boolean) => void;
	setHandle?: (isValid: boolean, validate: () => void) => void;
}

const ValidatedEntry = forwardRef<
	Record<string, { isValid: boolean; validate: () => void }>,
	Props
>((props, ref) => {
	const [state, setState] = useState<FieldData>({ value: props.value });

	const validate = () => {
		let err = undefined;
		if (props.validateFunction) {
			err = props.validateFunction(state.value);
			props.onValidation && props.onValidation(err === undefined);
		}

		props.setHandle && props.setHandle(!err, validate);
		setState({ value: state.value, isValid: !err, error: err });
	};

	useEffect(() => {
		setState({ value: props.value });
	}, [props.value]);

	useEffect(() => {
		props.setHandle && props.setHandle(!state.error, validate);
	}, []);

	return (
		<FieldInput
			type={props.type ? props.type : "text"}
			placeHolder={props.placeholder ? props.placeholder : ""}
			{...state}
			onChange={(d) => {
				props.onChange && props.onChange(d.target.value);
			}}
			onBlur={() => {
				validate();
			}}
		/>
	);
});

export default ValidatedEntry;
