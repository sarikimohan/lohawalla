import { Card } from "@mui/material";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";

interface Props {}

export default function ThirdPart(props: Props) {
	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="mb-4">
					<FormCardHeader heading="Global Fields" subheading="Enter" />
				</div>
				<Card sx={{ padding: 3 }} variant="outlined">
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
							{[].map((v, i) => (
								<tr className="mb-2 border-b">
									<td align="center">
										<p className="text-md font-bold text-slate-700 py-5"></p>
									</td>
									<td align="center" className="w-2/5">
										<FieldInput
											onChange={(d) => {}}
											type={"text"}
											placeHolder={"enter value"}
											isValid={undefined}
											data={""}
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
								<td align="center" className="p-1">
									<FieldInput
										type={"text"}
										placeHolder={"enter key"}
										isValid={undefined}
										data={""}
									/>
								</td>
								<td align="center" className="p-1">
									<FieldInput
										type={"text"}
										placeHolder={"enter value"}
										isValid={undefined}
										data={""}
									/>
								</td>
								<td align="center" className="p-1">
									<div onClick={() => {}}>
										<RotateAndScale config={{ scale: 1.05, rotate: 0 }}>
											<button className="px-4 py-2 rounded-md bg-indigo-600 text-white">
												Add
											</button>
										</RotateAndScale>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</Card>
			</Card>
		</>
	);
}
