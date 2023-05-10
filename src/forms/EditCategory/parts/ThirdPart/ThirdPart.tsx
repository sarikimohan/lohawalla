import { Card, Checkbox } from "@mui/material";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";

interface Props {}

export default function ThirdPart(props: Props) {
	return (
		<Card variant="outlined" sx={{ padding: 3 }}>
			<div className="mb-4">
				<FormCardHeader heading="Global Fields" subheading="Enter" />
			</div>
			<Card variant="outlined" sx={{ padding: 3 }}>
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
							<tr className="mb-2 border-b">
								<td align="center">
									<p className="text-md font-bold text-slate-700 py-3">
										3 days
									</p>
								</td>
								<td align="center" className="py-3">
									<FieldInput
										isValid={undefined}
										data={"4"}
										type={"number"}
										placeHolder={"enter number"}
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
							<tr
								className="mb-2 border-b"
								style={{ borderTop: "5px solid transparent" }}
							>
								<td colSpan={3}>
									<div className="flex w-full justify-between">
										<div className="p-2 flex justify-center">
											<FieldInput
												width={"85%"}
												type={"text"}
												placeHolder={"enter key"}
												isValid={undefined}
												data={""}
											/>
										</div>
										<div className="p-2 flex justify-center">
											<FieldInput
												width={"85%"}
												type={"text"}
												placeHolder={"enter value"}
												isValid={undefined}
												data={""}
											/>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="flex justify-end mt-5">
					<AddMore />
				</div>
			</Card>
		</Card>
	);
}
