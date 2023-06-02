import {
	Autocomplete,
	Card,
	Checkbox,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import AddMore from "@src/Components/common/buttons/AddMore/AddMore";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import Tip from "@src/Components/feedback/Tooltip/Tip";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import FieldTextArea from "@src/Components/forms/FieldInput/FieldTextArea";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import ImageSmall from "@src/Components/common/ImageSmall/ImageSmall";
import FormFileUploadHeader from "@src/Components/forms/FormFileUploadHeader/FormFileUploadHeader";
import FormFileUpload from "@src/Components/forms/FormFileUpload/FormFileUpload";
import { FieldDataService } from "@src/modules/FieldData/FieldData";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import SetActions from "./actions/SetActions";

export interface RIEditProduct {}

export namespace PIEditProduct {}

export default function EditProduct(props: RIEditProduct) {
	const [state, setState] = useState<EditProduct.State>({
		selectedCompany: "",
		selectedCategory: "",
		selectedItem: "",
		images: [],
		imageFiles: null,
		priceStructure: [],
		margin: {
			online: 0,
			cash: 0,
		},
		credits: [],
		negotiation: 0,
		gst: {
			type: "numeric",
			value: FieldDataService.getDefaultField(),
		},
		description: FieldDataService.getDefaultField(),
		descriptionLabels: [],
		descriptionEntry: {
			key: FieldDataService.getDefaultField(),
			value: FieldDataService.getDefaultField(),
		},
		loading: {
			fetch: AsyncStateFactory(),
		},
	});

	const [] = useState<EditProduct.State>({
		selectedCompany: "",
		selectedCategory: "",
		selectedItem: "",
		images: [],
		imageFiles: null,
		priceStructure: [],
		margin: {
			online: 0,
			cash: 0,
		},
		credits: [],
		negotiation: 0,
		gst: {
			type: "numeric",
			value: FieldDataService.getDefaultField(),
		},
		description: FieldDataService.getDefaultField(),
		descriptionLabels: [],
		descriptionEntry: {
			key: FieldDataService.getDefaultField(),
			value: FieldDataService.getDefaultField(),
		},
		loading: {},
	});

	const setActions = new SetActions(state, setState);

	return (
		<PopUpContainer>
			<FormContainer>
				<div className="mb-8">
					<FormHeader
						navBack={() => {}}
						heading={"Product"}
						preHeading={"ADD"}
						close={function (): void {
							throw new Error("Function not implemented.");
						}}
					/>
				</div>
				<div className="flex flex-wrap mb-4">
					<div className="basis-1/2 p-3">
						<DefaultFormLabel className="mb-3">Select Company</DefaultFormLabel>
						<Autocomplete
							renderInput={(params) => (
								<TextField {...params} label="Company" />
							)}
							options={[]}
							disabled
							value={state.selectedCompany}
						/>
					</div>
					<div className="basis-1/2 p-3">
						<DefaultFormLabel className="mb-3">
							Select Category
						</DefaultFormLabel>
						<Autocomplete
							renderInput={(params) => (
								<TextField {...params} label="Company" />
							)}
							disabled
							options={[]}
							value={state.selectedCategory}
						/>
					</div>
					<div className="basis-1/2 p-3">
						<DefaultFormLabel className="mb-3">Select Item</DefaultFormLabel>
						<Autocomplete
							renderInput={(params) => (
								<TextField {...params} label="Company" />
							)}
							disabled
							value={state.selectedItem}
							options={[]}
						/>
					</div>
				</div>

				<DefaultFormLabel>Delete images</DefaultFormLabel>
				<div className="border p-4 rounded-md mb-5">
					<div className="crow">
						{state.images.map((v, i) => (
							<div
								className="ml-3"
								onClick={() => {
									setActions.deleteImage(i);
								}}
								style={{ display: v.deleted ? "none" : "block" }}
								key={v.link}
							>
								<div
									style={{
										position: "relative",
									}}
								>
									<ImageSmall
										index={0}
										src={v.link}
										currentSelected={0}
										setSelected={function (): void {}}
									/>
									<motion.div
										className="flex justify-center items-center cursor-pointer"
										animate={{ color: "#ff0000" }}
										transition={{ duration: 0.1 }}
										style={{
											position: "absolute",
											width: "100%",
											height: "100%",
											background: "white",
											opacity: 0,
											zIndex: 200,
											top: 0,
											left: 0,
										}}
										whileHover={{
											opacity: 0.8,
											scale: 1.05,
											border: "1px solid lightgrey",
											borderRadius: 6,
										}}
									>
										<DeleteIcon />
									</motion.div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mb-5">
					<div className="mb-3">
						<FormFileUploadHeader>
							Upload Images for product
						</FormFileUploadHeader>
					</div>
					<FormFileUpload />
				</div>

				<div className="mb-5">
					<>
						<Card variant="outlined" sx={{ padding: 3 }}>
							<div className="mb-4">
								<FormCardHeader heading="Price Structure" subheading="Enter" />
							</div>
							<div
								className="border"
								style={{ borderRadius: "8px 8px 0px 0px" }}
							>
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
										{state.priceStructure.map((v, i) => (
											<tr key={v._id}>
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
															onChange={(d) => {
																setActions.editPriceStructure(
																	d.target.value,
																	i
																);
															}}
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
									<div
										className="border"
										style={{ borderRadius: "8px 8px 0px 0px" }}
									>
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
															value={state.margin.online + ""}
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
															value={state.margin.cash + ""}
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
									<div
										className="border"
										style={{ borderRadius: "8px 8px 0px 0px" }}
									>
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
												{state.credits.map((v, i) => (
													<tr className="mb-2 border-b" key={i}>
														<td align="center">
															<p className="text-md font-bold text-slate-700 py-5">
																days
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
								<DefaultFormLabel className="mb-2">
									Negotiation
								</DefaultFormLabel>
								<FieldInput
									disabled
									value={state.negotiation + ""}
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
									<DefaultFormLabel className="mb-2">
										Enter Gst
									</DefaultFormLabel>
								</div>
								<div className="flex justify-between">
									<div className="basis-3/6">
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">GST</InputLabel>
											<Select<string>
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="GST"
												value={state.gst.type}
												onChange={(e) =>
													setActions.setGst(e.target.value as PercNum)
												}
											>
												<MenuItem value={"numeric"}>GST Numeric</MenuItem>
												<MenuItem value={"percentage"}>GST Percentage</MenuItem>
											</Select>
										</FormControl>
									</div>
									<div className="basis-2/5">
										<FieldInput
											type={"number"}
											placeHolder={"enter value"}
											rightIcon={state.gst.type === "numeric" ? "₹" : "%"}
										/>
									</div>
								</div>
							</Card>
						</Card>
					</>
				</div>
				<div>
					<Card variant="outlined" sx={{ padding: 3 }}>
						<div className="mb-4">
							<FormCardHeader heading="Description" />
						</div>
						<div className="mb-4">
							<DefaultFormLabel className="mb-2">Description</DefaultFormLabel>
							<FieldTextArea
								onChange={(d) => {
									setActions.setDescription(d.target.value);
								}}
								height={120}
								placeHolder={"enter description"}
							/>
						</div>

						<DefaultFormLabel className="mb-2">
							Description Labels
						</DefaultFormLabel>
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
												<p className="text-md font-semibold text-slate-500 ">
													Value
												</p>
											</th>
											<th className="w-fit"></th>
										</tr>
									</thead>

									<tbody>
										{state.descriptionLabels.map((v, i) => (
											<tr className="mb-2 border-b">
												<td align="center">
													<p className="text-md font-bold text-slate-700 py-5">
														{v.key}
													</p>
												</td>
												<td align="center" className="w-2/5">
													<FieldInput
														{...v.value}
														onChange={(e) => {
															setActions.setDescEdit(e.target.value, i);
														}}
														type={"text"}
														placeHolder={"enter value"}
													/>
												</td>
												<td align="center" className="w-fit">
													<div
														onClick={() => {
															setActions.deleteDescription(i);
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
											<td align="center" className="p-1">
												<div className="p-2">
													<FieldInput
														{...state.descriptionEntry.key}
														onChange={(d) => {
															setActions.setDescriptionKey(d.target.value);
														}}
														width={"85%"}
														type={"text"}
														placeHolder={"enter key"}
													/>
												</div>
											</td>
											<td align="center" className="p-1" colSpan={2}>
												<div className="p-2">
													<FieldInput
														{...state.descriptionEntry.value}
														onChange={(d) => {
															setActions.setDescriptionValue(d.target.value);
														}}
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
								<AddMore
									handleAdd={() => {
										// validate
										setActions.addDescription();
									}}
								/>
							</div>
						</Card>
					</Card>
					<div className="mt-5">
						<DefaultButton onClick={function (): void {}} label={"Save"} />
					</div>
				</div>
			</FormContainer>
		</PopUpContainer>
	);
}
