import React, { useState } from "react";
import style from "./DataTable.module.css";
import { Button, Divider } from "@mui/material";
import LoopArray from "@src/modules/Utils/LoopArray";
import FormikInput from "../inputs/FormikInput";
import Header from "./components/Header/Header";
import Input from "../inputs/Input";
import AssetIndex from "@src/assets/AssetIndex";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";

interface Data {
	key: string;
	value: any;
}

export type DataTableError = {
	keyError?: string;
	valueError?: string;
};

export type DataTableAddFn = (props: Data) => {
	keyError?: string;
	valueError?: string;
};

interface DataTableProps {
	header?: { first: string; second: string };
	placeholder?: { key: string; value: string };
	data: Data[];
	getPath: (d: Data, index: number) => string;
	onAdd?: DataTableAddFn;
	onDelete?: (index: number) => void;
}

export default function DataTable(props: DataTableProps) {
	const {
		header = { first: "key", second: "value" },
		placeholder = { key: "key", value: "value" },
		data,
		getPath,
		onAdd,
		onDelete,
	} = props;

	const [inputData, setInputData] = useState<Data>({
		key: "",
		value: "",
	});
	const [errors, setErrors] = useState({
		key: {
			hasError: false,
			errorMessage: "",
		},
		value: {
			hasError: false,
			errorMessage: "",
		},
	});

	const handleAdd = () => {
		if (inputData.key === "") {
			setErrors((p) => ({
				...p,
				key: {
					hasError: true,
					errorMessage: "cannot be empty",
				},
			}));
		} else {
			setErrors((p) => ({
				...p,
				key: {
					hasError: false,
					errorMessage: "cannot be empty",
				},
			}));
		}

		if (inputData.value === "") {
			setErrors((p) => ({
				...p,
				value: {
					hasError: true,
					errorMessage: "cannot be empty",
				},
			}));
			return;
		} else {
			setErrors((p) => ({
				...p,
				value: {
					hasError: false,
					errorMessage: "cannot be empty",
				},
			}));
		}

		if (onAdd) {
			const verdict = onAdd(inputData);
			const { keyError, valueError } = verdict;
			if (keyError) {
				setErrors((p) => ({
					...p,
					key: {
						hasError: true,
						errorMessage: keyError,
					},
				}));
			}
			if (valueError) {
				setErrors((p) => ({
					...p,
					value: {
						hasError: true,
						errorMessage: valueError,
					},
				}));
			}
			if (!keyError && !valueError) {
				setInputData({ key: "", value: "" });
			}
		}
	};

	const handleDelete = (index: number) => {
		if (onDelete) {
			onDelete(index);
		}
	};

	return (
		<div style={{ width: "100%" }}>
			<Header {...header} />
			<div className="mt-3 mb-3">
				<Divider />
			</div>
			<div className={style.rowContainer}>
				{data.map((v, i) => {
					return (
						<div className={" w-100 flex"} key={i}>
							<div className="flex items-center grow justify-between mr-4">
								<div className="p-2 px-4 border border-slate-200 basis-3/6">
									<p className="body fw-bold fcolor-onyx">{v.key}</p>
								</div>
								<div className="basis-2/5">
									<FormikInput
										type={"text"}
										placeHolder={""}
										name={getPath(v, i)}
									/>
								</div>
							</div>
							<div
								className="flex items-center justify-center w-10"
								onClick={() => handleDelete(i)}
							>
								<RotateAndScale>
									<AssetIndex.MinusCircleIcon />
								</RotateAndScale>
							</div>
						</div>
					);
				})}
			</div>
			<div className="mt-3 mb-3">
				<Divider />
			</div>
			<div className="flex space-x-3 items-center mb-4">
				<div className="flex grow space-x-3 justify-between">
					<div className="basis-2/5">
						<Input
							width={""}
							error={errors.key}
							isValid={undefined}
							data={inputData.key}
							type={"text"}
							placeHolder={placeholder.key}
							onChange={(v) =>
								setInputData((p) => ({ ...p, key: v.target.value }))
							}
							onEnter={handleAdd}
						/>
					</div>
					<div className="basis-2/5">
						<Input
							width={""}
							error={errors.value}
							isValid={undefined}
							data={inputData.value}
							type={"text"}
							placeHolder={placeholder.value}
							onChange={(v) =>
								setInputData((p) => ({ ...p, value: v.target.value }))
							}
							onEnter={handleAdd}
						/>
					</div>
				</div>
				<div className="flex items-center justify-center w-10 opacity-0">
					<RotateAndScale>
						<AssetIndex.MinusCircleIcon />
					</RotateAndScale>
				</div>
			</div>
			<Button
				onClick={handleAdd}
				variant="outlined"
				sx={{ borderColor: "var(--iris)", minWidth: "max-content" }}
				startIcon={<AssetIndex.PlusIconBlue />}
			>
				<p className="button fcolor-iris">ADD MORE</p>
			</Button>
		</div>
	);
}
