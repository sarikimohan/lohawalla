import { Checkbox } from "@mui/material";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import ValidatedEntry, {
	SetHandleProps,
} from "@src/Components/special/ValidatedEntry/ValidatedEntry";
import AssetIndex from "@src/assets/AssetIndex";
import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";

interface Credit {
	days: number;
	value: number;
	type: PercNum;
}

export interface RICreditInput {
	initialValue: Credit[];
	setHandle: (d: PICreditInput.Handle) => void;
}

export namespace PICreditInput {
	export interface Handle {
		values: Credit[];
		isValid: boolean;
		validate: () => void;
	}
}

export default function CreditInput(props: RICreditInput) {
	const [credits, setCredits] = useState<(Credit & { _id: string })[]>([]);

	useEffect(() => {
		setCredits(props.initialValue.map((v) => ({ ...v, _id: nanoid() })));
	}, []);

	useEffect(() => {
		props.setHandle({
			values: credits.map((v) => ({
				days: v.days,
				value: v.value,
				type: v.type,
			})),
			isValid: true,
			validate,
		});
	}, [...credits]);

	const handle = useRef<Record<string, SetHandleProps>>({});
	const setHandle = (name: string) => {
		return (d: SetHandleProps) => {
			handle.current[name] = d;
		};
	};

	const validate = () => {
		Object.values(handle.current).forEach((v) => {
			v.validate();
		});

		const isValid = Object.values(handle.current).reduce(
			(a, c) => a && c.isValid,
			true
		);

		props.setHandle({
			values: credits.map((v) => ({
				days: v.days,
				value: v.value,
				type: v.type,
			})),
			isValid,
			validate,
		});
	};

	return (
		<>
			<table className="w-full border table-fixed">
				<thead
					className="bg-slate-100 h-10 border-b border-slate-400"
					style={{ boxSizing: "border-box" }}
				>
					<tr className="px-4 py-2">
						<th>
							<p className="text-md font-semibold text-slate-500">Days</p>
						</th>
						<th>
							<p className="text-md font-semibold text-slate-500">in rupees</p>
						</th>
						<th>
							<p className="text-md font-semibold text-slate-500 ">Value</p>
						</th>
						<th className="w-2/12"></th>
					</tr>
				</thead>

				<tbody>
					{credits.map((v, i) => (
						<tr className="mb-2 border-b" key={i}>
							<td align="center">
								<p className="text-md font-bold text-slate-700 py-3">
									{v.days} days
								</p>
							</td>
							<td align="center">
								<Checkbox onChange={(e) => {}} />
							</td>
							<td align="center" className="w-2/5 py-3">
								<ValidatedEntry
									value={v.value + ""}
									setHandle={setHandle("credit")}
								/>
							</td>
							<td align="center" className="w-fit">
								<div onClick={() => {}}>
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
						<td colSpan={4}>
							<div className="flex w-full justify-between">
								<div className="p-2 flex justify-center">
									<FieldInput
										width={"85%"}
										type={"text"}
										placeHolder={"enter key"}
									/>
								</div>
								<div className="p-2 flex justify-center">
									<FieldInput
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
		</>
	);
}
