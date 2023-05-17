import React, { useState, useEffect, useRef } from "react";
import FieldInput from "../../forms/FieldInput/FieldInput";

interface Props {
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	onChange: (e: string) => void;
	value: string;
	validateFunction?: (d: string) => string | undefined;
	onValidation?: (isValid: boolean) => void;
	triggerValidation?: boolean;
}

export default function ValidatedEntry(props: Props) {
	const [state, setState] = useState<FieldData>({ value: props.value });
	const firstRenderRef = useRef(true);

	const validate = () => {
		let err = undefined;
		if (props.validateFunction) {
			err = props.validateFunction(state.value);
			props.onValidation && props.onValidation(err === undefined);
		}

		setState({ value: state.value, isValid: !err, error: err });
	};

	useEffect(() => {
		setState({ value: props.value });
	}, [props.value]);

	useEffect(() => {
		if (!firstRenderRef.current) {
			validate();
		}
		firstRenderRef.current = false;
	}, [props.triggerValidation]);

	return (
		<FieldInput
			type={props.type ? props.type : "text"}
			placeHolder={props.placeholder ? props.placeholder : ""}
			{...state}
			onChange={(d) => {
				props.onChange && props.onChange(d.target.value);
			}}
			onBlur={() => {
				// validate();
			}}
		/>
	);
}
