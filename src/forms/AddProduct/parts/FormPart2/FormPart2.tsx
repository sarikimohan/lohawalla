import { Card } from "@mui/material";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import React from "react";

interface Props {}

export default function FormPart2(props: Props) {
	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="mb-4">
					<FormCardHeader heading="Price Structure" subheading="Enter" />
				</div>
				<div>
					<table className="w-full table-fixed">
						<thead
							className="bg-slate-100 h-10 border-b border-slate-400"
							style={{ boxSizing: "border-box" }}
						>
							<tr className="px-4 py-2 rounded-md">
								<th style={{ borderTopLeftRadius: 8 }}>
									<p className="text-md font-semibold text-slate-500">
										Description
									</p>
								</th>
								<th style={{ borderTopRightRadius: 8 }}>
									<p className="text-md font-semibold text-slate-500 ">
										Amount
									</p>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div className="border pl-6 py-3">
										<p className="text-md font-bold text-slate-900">
											Basic Rate
										</p>
									</div>
								</td>
								<td>
									<div className="p-2 pl-6">
										<FieldInput type={"number"} placeHolder={"value"} />
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Card>
		</>
	);
}
