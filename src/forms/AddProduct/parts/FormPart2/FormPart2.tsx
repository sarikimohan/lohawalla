import {
	Card,
	Checkbox,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import Tip from "@src/Components/feedback/Tooltip/Tip";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";
import React, { useEffect } from "react";
import { useAddProductContext } from "../../AddProductForm";

interface Props {}

export default function FormPart2(props: Props) {
	const { state, validate, secondFormActions } = useAddProductContext();

	useEffect(() => {
		if (state.secondForm.hasVisited === false) {
			secondFormActions.fetchSecondFormData();
			secondFormActions.mutateState((p) => {
				p.secondForm.hasVisited = true;
			});
		}
	}, []);

	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="mb-4">
					<FormCardHeader heading="Price Structure" subheading="Enter" />
				</div>
				<div className="border" style={{ borderRadius: "8px 8px 0px 0px" }}>
					<table className="w-full table-fixed">
						<thead
							className="bg-indigo-100 h-10 border-b border-slate-400"
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
							{state.secondForm.priceStructure.map((v, i) => (
								<tr key={i}>
									<td>
										<div className="ml-2 border pl-6 py-3">
											<p className="text-md font-bold text-slate-700">
												<span
													className={
														v.operation === "add"
															? "text-green-500"
															: "text-red-500"
													}
												>
													{v.operation === "add" ? "+" : "-"} {v.name}{" "}
													{v.type === "numeric" ? "(₹)" : "(%)"}
												</span>
											</p>
										</div>
									</td>
									<td align="center">
										<Checkbox checked={v.isFixed} disabled />
									</td>
									<td>
										<div className="p-2 pl-6">
											<FieldInput
												{...v.value}
												onChange={(d) => {
													secondFormActions.setPriceFieldValue(
														i,
														d.target.value
													);
												}}
												disabled={v.isFixed}
												type={"number"}
												placeHolder={"value"}
											/>
										</div>
									</td>
								</tr>
							))}
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
												disabled
												value={state.secondForm.margin.online + ""}
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
												disabled
												value={state.secondForm.margin.cash + ""}
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
									{state.secondForm.credits.map((v, i) => (
										<tr className="mb-2 border-b" key={i}>
											<td align="center">
												<p className="text-md font-bold text-slate-700 py-5">
													{v.day} days
												</p>
											</td>
											<td align="center" className="w-2/5">
												<div className="p-2">
													<FieldInput
														disabled
														value={v.value + ""}
														rightIcon={v.isNumeric ? "rs" : "%"}
														onChange={(d) => {}}
														type={"text"}
														placeHolder={"enter value"}
													/>
												</div>
											</td>
										</tr>
									))}
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
					<FieldInput
						disabled
						value={state.secondForm.negotiation + ""}
						type={"number"}
						placeHolder={""}
						rightIcon={"%"}
					/>
				</div>
			</Card>
			<div className="my-5">
				<Divider />
			</div>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<div className="mb-4">
					<FormCardHeader heading="GST Details" subheading="Enter" />
				</div>
				<Card variant="outlined" sx={{ padding: 3 }}>
					<div>
						<DefaultFormLabel className="mb-2">Enter Gst</DefaultFormLabel>
					</div>
					<div className="flex justify-between">
						<div className="basis-3/6">
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">GST</InputLabel>
								<Select<string>
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									label="GST"
									value={state.secondForm.gst.type}
									onChange={(e) => {
										secondFormActions.setGstType(e.target.value as PercNum);
									}}
								>
									<MenuItem value={"numeric"}>GST Numeric</MenuItem>
									<MenuItem value={"percentage"}>GST Percentage</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className="basis-2/5">
							<FieldInput
								{...state.secondForm.gst.value}
								onChange={(e) => {
									secondFormActions.setGstValue(e.target.value);
								}}
								type={"number"}
								placeHolder={"enter value"}
							/>
						</div>
					</div>
				</Card>
			</Card>
			<div className="flex justify-end mt-5">
				<DefaultButton
					onClick={function (): void {
						const verdict = validate.validateSecondForm();
						if (verdict) {
							secondFormActions.mutateState((p) => p.page++);
						}
					}}
					label={"Next"}
					styles={NextButtonStyleConfig}
				/>
			</div>
		</>
	);
}
