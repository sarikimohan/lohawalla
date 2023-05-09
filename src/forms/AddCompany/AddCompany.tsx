import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import ProgressBar from "@src/Components/common/ProgressBar/ProgressBar";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import React, { useContext, useState } from "react";
import { InitialState } from "./managment/state/initialState";
import AddCompanyActions from "./managment/actions/AddCompanyActions";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import { Button, Card, Checkbox, Divider, Input } from "@mui/material";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import AssetIndex from "@src/assets/AssetIndex";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import AddPriceField from "./form/AddPriceField/AddPriceField";
import { useFormik } from "formik";

interface Props {}
interface ContextProps {
	state: AddCompany.State;
	addCompanyActions: AddCompanyActions;
}

const AddCompanyContext = React.createContext({} as ContextProps);

export const useAddCompanyContext = () => useContext(AddCompanyContext);

export default function AddCompany(props: Props) {
	const [state, setState] = useState<AddCompany.State>(InitialState);
	const [showAdd, setShowAdd] = useState(false);
	const addCompanyActions = new AddCompanyActions(state, setState);

	return (
		<AddCompanyContext.Provider value={{ state, addCompanyActions }}>
			<PopUpContainer>
				<FormContainer>
					<div className="mb-4">
						<FormHeader
							navBack={function (): void {}}
							close={function (): void {}}
							heading={"Company"}
							preHeading={"Add"}
						/>
					</div>
					<div className="mb-5">
						<ProgressBar currentStep={state.page + 1} steps={3} />
					</div>
					<div className="mb-4">
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
												<p className="text-md font-semibold text-slate-500">
													State
												</p>
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
										<tr className="mb-2 border-b">
											<td align="center">
												<p className="text-md font-bold text-slate-700 py-5">
													+Basic Rate
												</p>
											</td>
											<td align="center">
												<Checkbox />
											</td>
											<td align="center" className="w-2/5">
												<Input sx={{ width: "80%" }} />
											</td>
											<td align="center" className="w-fit">
												<RotateAndScale>
													<AssetIndex.MinusCircleIcon />
												</RotateAndScale>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="mt-8">
								<Button
									onClick={() => {
										setShowAdd(true);
									}}
									variant="outlined"
									sx={{ borderColor: "var(--iris)", minWidth: "max-content" }}
									startIcon={<AssetIndex.PlusIconBlue />}
								>
									<p className="button fcolor-iris">ADD MORE</p>
								</Button>
							</div>
						</Card>
					</div>
				</FormContainer>
			</PopUpContainer>
			{showAdd && <AddPriceField />}
		</AddCompanyContext.Provider>
	);
}
