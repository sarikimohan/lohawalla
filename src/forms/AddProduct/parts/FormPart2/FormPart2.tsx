import { Card, Checkbox, Divider } from "@mui/material";
import Tip from "@src/Components/feedback/Tooltip/Tip";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React from "react";

interface Props {}

export default function FormPart2(props: Props) {
	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="mb-4">
					<FormCardHeader heading="Price Structure" subheading="Enter" />
				</div>
				<div className="border" style={{ borderRadius: "8px 8px 0px 0px" }}>
					<table className="w-full table-fixed">
						<thead
							className="bg-slate-100 h-10 border-b border-slate-400"
							style={{ boxSizing: "border-box" }}
						>
							<tr className="px-4 py-2 rounded-md">
								<th style={{ borderTopLeftRadius: 8 }} className="w-4/12">
									<p className="text-md font-semibold text-slate-500">
										Description
									</p>
								</th>
								<th className="w-3/12">
									<p className="text-md font-semibold text-slate-500">
										isFixed
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
									<div className="ml-2 border pl-6 py-3">
										<p className="text-md font-bold text-slate-900">
											Basic Rate
										</p>
									</div>
								</td>
								<td align="center">
									<Checkbox />
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
				<div className="my-5">
					<Divider />
				</div>
				<div>
					<div className="mb-4">
						<FormCardHeader heading="Margin Structure" subheading="The" />
					</div>
					<Card variant="outlined" sx={{ padding: 3 }}>
						<div className="border" style={{ borderRadius: "8px 8px 0px 0px" }}>
							<table className="w-full table-fixed">
								<thead
									className="bg-slate-100 h-10 border-b border-slate-400"
									style={{ boxSizing: "border-box" }}
								>
									<tr className="px-4 py-2 rounded-md">
										<th style={{ borderTopLeftRadius: 8 }}>
											<p className="text-md font-semibold text-slate-500">
												Type
											</p>
										</th>
										<th style={{ borderTopRightRadius: 8 }}>
											<p className="text-md font-semibold text-slate-500 ">
												Percentage
											</p>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="mb-2 border-b">
										<td align="center">
											<Tip title={"enter values in percentage"}>
												<p className="text-md font-bold text-slate-700	py-4">
													Online
												</p>
											</Tip>
										</td>
										<td align="center" className="">
											<FieldInput
												width={"80%"}
												type={"number"}
												placeHolder={"enter value"}
											/>
										</td>
									</tr>
									<tr className="mb-2 border-b">
										<td align="center">
											<Tip title={"enter values in percentage"}>
												<p className="text-md font-bold text-slate-700 py-5">
													Cash
												</p>
											</Tip>
										</td>
										<td align="center">
											<FieldInput
												width={"80%"}
												type={"number"}
												placeHolder={"enter value"}
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Card>
				</div>
				<div className="my-5">
					<Divider />
				</div>
				<div>
					<div className="mb-4">
						<FormCardHeader heading="Credit Structure" subheading="The" />
					</div>
					<Card variant="outlined" sx={{ padding: 3 }}>
						<div className="border" style={{ borderRadius: "8px 8px 0px 0px" }}>
							<table className="w-full table-fixed">
								<thead
									className="bg-slate-100 h-10 border-b border-slate-400"
									style={{ boxSizing: "border-box" }}
								>
									<tr className="px-4 py-2">
										<th style={{ borderTopLeftRadius: 8 }}>
											<p className="text-md font-semibold text-slate-500">
												Time (Day)
											</p>
										</th>
										<th>
											<p className="text-md font-semibold text-slate-500 ">
												Value
											</p>
										</th>
									</tr>
								</thead>

								<tbody>
									<tr className="mb-2 border-b">
										<td align="center">
											<p className="text-md font-bold text-slate-700 py-5">
												5 days
											</p>
										</td>
										<td align="center" className="w-2/5">
											<div className="p-2">
												<FieldInput
													onChange={(d) => {}}
													type={"text"}
													placeHolder={"enter value"}
												/>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Card>
				</div>
				<div className="my-5">
					<Divider />
				</div>
				<div>
					<DefaultFormLabel className="mb-2">Negotiation</DefaultFormLabel>
					<FieldInput type={"number"} placeHolder={""} />
				</div>
			</Card>
		</>
	);
}
