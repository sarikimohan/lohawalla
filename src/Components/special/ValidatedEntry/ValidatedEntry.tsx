import React, { useState, useEffect, forwardRef } from "react";
import FieldInput from "../../forms/FieldInput/FieldInput";

export type SetHandle = (
	isValid: boolean,
	validate: () => Promise<void>
) => void;
export type SetHandleProps = { isValid: boolean; validate: () => Promise<void> };

interface Props {
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	onChange: (e: string) => void;
	value: string;
	validateFunction?: (d: string) => string | undefined;
	onValidation?: (isValid: boolean) => void;
	setHandle?: (isValid: boolean, validate: () => Promise<void>) => void;
	asyncValidator?: (d: string) => Promise<string | undefined>;
}

const ValidatedEntry = forwardRef<
	Record<string, { isValid: boolean; validate: () => void }>,
	Props
>((props, ref) => {
	const [state, setState] = useState<FieldData>({ value: props.value });
	const [loading, setLoading] = useState<AsyncState>({
		status: "dormant",
		message: "",
	});

	const validate = async () => {
		let err = undefined;
		if (props.validateFunction) {
			err = props.validateFunction(state.value);
			props.onValidation && props.onValidation(err === undefined);
		}

		const { asyncValidator } = props;
		if (!err && asyncValidator) {
			setLoading((p) => ({ ...p, status: "initialized" }));
			try {
				const res = await asyncValidator(state.value);
				err = res;
				setLoading((p) => ({ ...p, status: "success" }));
			} catch (err) {
				err = "server error, failed to validate";
				setLoading((p) => ({ ...p, status: "failed" }));
			} finally {
				props.setHandle && props.setHandle(!err, validate);
				setState({ value: state.value, isValid: !err, error: err });
				setLoading((p) => ({ ...p, status: "dormant" }));
			}
		} else {
			props.setHandle && props.setHandle(!err, validate);
			setState({ value: state.value, isValid: !err, error: err });
		}
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
			isLoading={loading.status === "initialized"}
		/>
	);
});

export default ValidatedEntry;
