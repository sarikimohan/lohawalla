import React, { useState, useEffect, forwardRef } from "react";
import FieldInput from "../../forms/FieldInput/FieldInput";

export type SetHandle = (config: SetHandleProps) => void;
export type SetHandleProps = {
	isValid: boolean;
	validate: () => Promise<void>;
	value: string;
};

interface Props {
	type?: React.HTMLInputTypeAttribute;
	placeHolder?: string;
	onChange?: (e: string) => void;
	value?: string;
	validateFunction?: (d: string) => string | undefined;
	onValidation?: (isValid: boolean) => void;
	setHandle?: SetHandle;
	asyncValidator?: (d: string) => Promise<string | undefined>;
	rightIcon?: React.ReactNode;
	width?: string | number;
	disabled?: boolean;
}

const ValidatedEntry = forwardRef<
	Record<string, { isValid: boolean; validate: () => void }>,
	Props
>((props, ref) => {
	const [state, setState] = useState<FieldData>({
		value: props.value ? props.value : "",
	});
	const [loading, setLoading] = useState<AsyncState>({
		status: "dormant",
		message: "",
	});

	const validate = async () => {
		let err: string | undefined = undefined;
		if (props.validateFunction) {
			err = props.validateFunction(state.value);
			props.onValidation && props.onValidation(err === undefined);
		}

		const { asyncValidator } = props;
		if (!err && asyncValidator) {
			setLoading((p) => ({ ...p, status: "initialized" }));
			try {
				const res = await asyncValidator(state.value);
				console.log("res was", res);
				err = res;
				setLoading((p) => ({ ...p, status: "success" }));
			} catch (error) {
				console.log("async failed");
				err = "server error, failed to validate";
				setLoading((p) => ({ ...p, status: "failed" }));
			} finally {
				props.setHandle &&
					props.setHandle({
						isValid: !err,
						validate,
						value: state.value,
					});
				setState((p) => ({ ...p, isValid: !err, error: err }));
				setLoading((p) => ({ ...p, status: "dormant" }));
			}
		} else {
			props.setHandle &&
				props.setHandle({
					isValid: !err,
					validate,
					value: state.value,
				});
			setState({ value: state.value, isValid: !err, error: err });
		}
	};

	useEffect(() => {
		setState((p) => ({ ...p, value: props.value ? props.value : "" }));
	}, [props.value]);

	useEffect(() => {
		props.setHandle &&
			props.setHandle({
				isValid: !state.error,
				validate,
				value: state.value,
			});
	});

	return (
		<FieldInput
			type={props.type ? props.type : "text"}
			placeHolder={props.placeHolder ? props.placeHolder : ""}
			{...state}
			onChange={(d) => {
				props.onChange && props.onChange(d.target.value);
				setState((p) => ({ ...p, value: d.target.value }));
			}}
			onBlur={() => {
				validate();
			}}
			isLoading={loading.status === "initialized"}
			rightIcon={props.rightIcon}
			width={props.width}
			disabled={props.disabled}
		/>
	);
});

export default ValidatedEntry;
