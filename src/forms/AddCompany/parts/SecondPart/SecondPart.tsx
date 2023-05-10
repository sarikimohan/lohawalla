import { Button, Card, Checkbox, Input } from "@mui/material";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React, { useState } from "react";
import { useAddCompanyContext } from "../../AddCompany";
import AddPriceField from "../../form/AddPriceField/AddPriceField";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";

interface Props {}

export default function SecondPart(props: Props) {
	const { state, secondFormActions } = useAddCompanyContext();
	const [showAddForm, setShowAddForm] = useState(false);

	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<FormCardHeader heading="Price Structure" subheading="Enter" />
				<div>
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
									<p className="text-md font-semibold text-slate-500">State</p>
								</th>
								<th>
									<p className="text-md font-semibold text-slate-500 ">
										Amount
									</p>
								</th>
								<th className="w-fit"></th>
							</tr>
						</thead>

						<tbody>
							{state.priceStructure.map((v, i) => (
								<tr className="mb-2 border-b" key={v.id}>
									<td align="center">
										<p className="text-md font-bold text-slate-700 py-5">
											{v.operation === "add" ? "+" : "-"} {v.name}
										</p>
									</td>
									<td align="center">
										{v.name === "basic rate" ? (
											<></>
										) : (
											<Checkbox
												onChange={(e) => {
													secondFormActions.fixField(e.target.checked, i);
												}}
											/>
										)}
									</td>
									<td align="center" className="w-2/5">
										<FieldInput
											isValid={v.value.isValid}
											error={v.value.error}
											data={v.value.value}
											onChange={(d) => {
												secondFormActions.editField(d.target.value, i);
											}}
											type={"number"}
											placeHolder={"enter value"}
											disabled={!v.fixed}
										/>
									</td>
									<td align="center" className="w-fit">
										<div
											onClick={() => {
												secondFormActions.deletePriceStructure(i);
											}}
										>
											<RotateAndScale>
												<AssetIndex.MinusCircleIcon />
											</RotateAndScale>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="mt-8 mb-6">
					<Button
						onClick={() => {
							setShowAddForm(true);
							secondFormActions.flushTemp();
						}}
						variant="outlined"
						sx={{ borderColor: "var(--iris)", minWidth: "max-content" }}
						startIcon={<AssetIndex.PlusIconBlue />}
					>
						<p className="button fcolor-iris">ADD MORE</p>
					</Button>
				</div>
				<div>
					<DefaultButton
						onClick={function (): void {
							const verdict = secondFormActions.validatePriceFieldForm();
							if (verdict) {
								secondFormActions.mutateState((p) => {
									p.page++;
								});
							}
						}}
						label={"Next"}
						styles={NextButtonStyleConfig}
					/>
				</div>
			</Card>
			{showAddForm && (
				<AddPriceField
					close={function (): void {
						setShowAddForm(false);
					}}
				/>
			)}
		</>
	);
}
