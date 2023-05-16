import AddMore from "@src/Components/common/buttons/AddMore/AddMore";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import StateUtils from "@src/modules/StateManagement/Core/StateUtils";
import { FieldDataService } from "@src/modules/FieldData/FieldData";

interface Props {
	list: {
		key: string;
		value: string;
	}[];
	validate: boolean;
	onValidated: (isValid: boolean) => void;
	onChangeFieldValue: (value: string, index: number) => void;
	validateFieldValue: (value: string) => string | undefined;
	validateAddKey: (value: string) => string | undefined;
	validateAddValue: (value: string) => string | undefined;

	deleteField: (i: number) => void;
	onAddField: (key: string, value: string) => void;
}

type State = {
	data: {
		key: string;
		value: FieldData;
		id: string;
	}[];
};

export default function EntryTable(props: Props) {
	const [state, setState] = useState<State>({
		data: props.list.map((v, i) => ({
			key: v.key,
			value: { value: v.value },
			id: nanoid(),
		})),
	});

	const [meta, setMeta] = useState({
		key: FieldDataService.getDefaultField(),
		value: FieldDataService.getDefaultField(),
	});

	const setActions = new StateUtils<State>(state, setState);
	const metaActions = new StateUtils<typeof meta>(meta, setMeta);

	useEffect(() => {
		setState((p) => {
			const o = { ...p };
			if (o.data.length === props.list.length) {
				for (let i = 0; i < p.data.length; ++i) {
					o.data[i].key = props.list[i].key;
					o.data[i].value.value = props.list[i].value;
				}
			} else {
				return {
					data: props.list.map((v, i) => ({
						key: v.key,
						value: { value: v.value },
						id: nanoid(),
					})),
				};
			}
			return o;
		});
	}, [props.list]);

	useEffect(() => {
		let verdict = true;
		setActions.mutateState((p) => {
			p.data.forEach((v, i) => {
				v.value.error = props.validateFieldValue(v.value.value);
				if (v.value.error) {
					verdict = false;
				}
				p.data[i].value = v.value;
			});
		});
		props.onValidated(verdict);
	}, [props.validate]);

	return (
		<>
			<div className="rounded-md overflow-hidden">
				<table className="w-full border table-fixed">
					<thead
						className="bg-slate-100 h-10 border-b border-slate-400"
						style={{ boxSizing: "border-box" }}
					>
						<tr className="px-4 py-2">
							<th>
								<p className="text-md font-semibold text-slate-500">Key</p>
							</th>
							<th>
								<p className="text-md font-semibold text-slate-500 ">Value</p>
							</th>
							<th className="w-2/12"></th>
						</tr>
					</thead>

					<tbody>
						{state.data.map((v, i) => (
							<tr className="mb-2 border-b" key={v.id}>
								<td align="center">
									<p className="text-md font-bold text-slate-700 py-3">
										{v.key}
									</p>
								</td>
								<td align="center" className="py-3">
									<FieldInput
										{...v.value}
										onChange={(d) => {
											props.onChangeFieldValue(d.target.value, i);
										}}
										type={"text"}
										placeHolder={"enter number"}
									/>
								</td>
								<td align="center" className="w-fit">
									<div
										onClick={() => {
											props.deleteField(i);
										}}
									>
										<RotateAndScale>
											<AssetIndex.MinusCircleIcon />
										</RotateAndScale>
									</div>
								</td>
							</tr>
						))}
						<tr
							className="mb-2 border-b"
							style={{ borderTop: "5px solid transparent" }}
						>
							<td colSpan={3}>
								<div className="flex w-full justify-between">
									<div className="p-2 flex justify-center">
										<FieldInput
											{...meta.key}
											onChange={(d) => {
												setMeta((p) => {
													const o = { ...p };
													o.key.value = d.target.value;
													return o;
												});
											}}
											width={"85%"}
											type={"text"}
											placeHolder={"enter key"}
										/>
									</div>
									<div className="p-2 flex justify-center">
										<FieldInput
											{...meta.value}
											onChange={(d) => {
												setMeta((p) => {
													const o = { ...p };
													o.value.value = d.target.value;
													return o;
												});
											}}
											width={"85%"}
											type={"text"}
											placeHolder={"enter value"}
										/>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="mt-5 flex justify-end">
				<AddMore
					handleAdd={() => {
						metaActions.mutateState((p) => {
							p.key.error = props.validateAddKey(p.key.value);
							p.value.error = props.validateAddValue(p.value.value);

							p.key.isValid = !p.key.error;
							p.value.isValid = !p.value.error;

							if (p.key.isValid && p.value.isValid) {
								props.onAddField(p.key.value, p.value.value);
								p.key.value = "";
								p.value.value = "";
							}
						});
					}}
				/>
			</div>
		</>
	);
}
