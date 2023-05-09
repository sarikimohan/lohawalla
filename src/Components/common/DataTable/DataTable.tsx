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

interface DataTableProps {
	header?: { first: string; second: string };
	placeholder?: { key: string; value: string };
	data: Data[];
	getPath: (d: Data, index: number) => string;
	onAdd?: (
		props: Data
	) => { keyError?: string; valueError?: string } | undefined;
}

export default function DataTable(props: DataTableProps) {
	const {
		header = { first: "key", second: "value" },
		placeholder = { key: "key", value: "value" },
		data,
		getPath,
		onAdd,
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
		if (onAdd) {
			const verdict = onAdd(inputData);
			if (verdict) {
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
			}
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
										type={"number"}
										placeHolder={""}
										name={getPath(v, i)}
									/>
								</div>
							</div>
							<div className="flex items-center justify-center w-10">
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
							type={"number"}
							placeHolder={placeholder.key}
							onChange={(v) =>
								setInputData((p) => ({ ...p, key: v.target.value }))
							}
						/>
					</div>
					<div className="basis-2/5">
						<Input
							width={""}
							error={errors.value}
							isValid={undefined}
							data={""}
							type={"number"}
							placeHolder={placeholder.value}
							onChange={(v) =>
								setInputData((p) => ({ ...p, value: v.target.value }))
							}
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
