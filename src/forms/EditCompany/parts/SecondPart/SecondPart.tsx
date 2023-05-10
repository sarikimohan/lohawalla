import { Alert, Button, Card, Checkbox, Input } from "@mui/material";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AssetIndex from "@src/assets/AssetIndex";
import React, { useState } from "react";
import AddPriceField from "../../form/AddPriceField/AddPriceField";
import FieldInput from "@src/Components/forms/FieldInput/FieldInput";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import NextButtonStyleConfig from "@src/Components/common/buttons/configurations/NextButtonStyle.config";
import Attention from "@src/Components/feedback/Alerts/Attention";
import Tip from "@src/Components/feedback/Tooltip/Tip";

interface Props {}

export default function SecondPart(props: Props) {
	// const { state, secondFormActions } = useAddCompanyContext();
	const [showAddForm, setShowAddForm] = useState(false);

	return (
		<>
			<Card variant="outlined" sx={{ padding: 3 }}>
				<FormCardHeader heading="Price Structure" subheading="Enter" />
				<div className="my-3">
					<Attention severity="warning">
						+ basic rate is a special price field
					</Attention>
				</div>
				<div className="rounded-md overflow-hidden">
					<table className="w-full border">
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
							{[].map((v, i) => (
								<tr className="mb-2 border-b">
									<td align="center">
										<p className="text-md font-bold text-slate-700 py-3">
											<span
												className={false ? "text-green-500" : "text-red-500"}
											></span>
										</p>
									</td>
									<td align="center">
										{false ? <></> : <Checkbox onChange={(e) => {}} />}
									</td>
									<td align="center" className="w-2/5 py-3">
										<FieldInput
											isValid={undefined}
											data={""}
											type={"number"}
											placeHolder={""}
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
						</tbody>
					</table>
				</div>
				<div className="mt-8 mb-6 flex justify-end">
					<Button
						onClick={() => {}}
						variant="outlined"
						sx={{ borderColor: "var(--iris)", minWidth: "max-content" }}
						startIcon={<AssetIndex.PlusIconBlue />}
					>
						<p className="button fcolor-iris">ADD MORE</p>
					</Button>
				</div>
				<div>
					<DefaultButton
						onClick={function (): void {}}
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
