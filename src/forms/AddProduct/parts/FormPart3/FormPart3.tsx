import { Card } from "@mui/material";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";

interface Props {}

export default function FormPart3(props: Props) {
	return (
		<Card variant="outlined" sx={{ padding: 3 }}>
			<div className="mb-4">
				<FormCardHeader heading="Description" />
			</div>
			<div className="mb-4">
				<DefaultFormLabel className="mb-2">Description</DefaultFormLabel>
				<FieldTextArea height={120} placeHolder={"enter description"} />
			</div>

			<DefaultFormLabel className="mb-2">Description Labels</DefaultFormLabel>
			<Card sx={{ padding: 3 }} variant="outlined">
				<div className="border rounded-md overflow-hidden">
					<table className="w-full">
						<thead
							className="bg-slate-100 h-10 border-b border-slate-400"
							style={{ boxSizing: "border-box" }}
						>
							<tr className="px-4 py-2">
								<th>
									<p className="text-md font-semibold text-slate-500">
										Description
									</p>
								</th>
								<th>
									<p className="text-md font-semibold text-slate-500 ">Value</p>
								</th>
								<th className="w-fit"></th>
							</tr>
						</thead>

						<tbody>
							<tr className="mb-2 border-b">
								<td align="center">
									<p className="text-md font-bold text-slate-700 py-5">key</p>
								</td>
								<td align="center" className="w-2/5">
									<FieldInput type={"text"} placeHolder={"enter value"} />
								</td>
								<td align="center" className="w-fit">
									<div onClick={() => {}}>
										<RotateAndScale>
											<AssetIndex.MinusCircleIcon />
										</RotateAndScale>
									</div>
								</td>
							</tr>
							<tr
								className="mb-2 border-b"
								style={{ borderTop: "5px solid transparent" }}
							>
								<td align="center" className="p-1">
									<div className="p-2">
										<FieldInput
											width={"85%"}
											type={"text"}
											placeHolder={"enter key"}
										/>
									</div>
								</td>
								<td align="center" className="p-1" colSpan={2}>
									<div className="p-2">
										<FieldInput
											width={"85%"}
											type={"text"}
											placeHolder={"enter value"}
										/>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="crow jfe mt-5">
					<AddMore handleAdd={() => {}} />
				</div>
			</Card>
			<div className="mt-5 flex justify-end">
				<DefaultButton
					onClick={function (): void {}}
					label={"Save"}
					styles={NextButtonStyleConfig}
				/>
			</div>
		</Card>
	);
}
