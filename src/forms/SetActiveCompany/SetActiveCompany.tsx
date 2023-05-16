import { Card } from "@mui/material";
import PopUpContainer from "@src/Components/common/Layout/PopUpContainer/PopUpContainer";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import FormCardHeader from "@src/Components/forms/FormCardHeader/FormCardHeader";
import FormContainer from "@src/Components/forms/FormContainer/FormContainer";
import FormHeader from "@src/Components/forms/FormHeader/FormHeader";
import { ImageIndex } from "@src/assets/AssetIndex";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import React, { useState } from "react";
import SetActions from "./actions/SetActions";

interface Props {}

export default function SetActiveCompany(props: Props) {
	const [state, setState] = useState<SetActiveCompany.State>({
		activeCompany: null,
		query: "",
		inActiveCompanies: [
			{
				_id: "23",
				name: "tata",
			},
			{ _id: "asdfa", name: "kamdhenu" },
		],
		loading: {
			fetch: AsyncStateFactory(),
			save: AsyncStateFactory(),
		},
	});

	const actions = new SetActions(state, setState);

	return (
		<PopUpContainer>
			<FormContainer width={800}>
				<div className="mb-6">
					<FormHeader
						navBack={() => {}}
						preHeading={"Active"}
						close={function (): void {
							throw new Error("Function not implemented.");
						}}
						heading={"Company (8mm TMT)"}
					/>
				</div>
				<div className="crow mb-3">
					<div className="mr-2">
						<div className="p-1 pl-4 pr-4">
							<p className="body fw-medium" style={{ color: "#9797AA" }}>
								Company
							</p>
						</div>
					</div>
					<div>
						<div
							className="p-4 px-8 rounded-md"
							style={{ background: "rgba(70, 213, 178, 0.19)" }}
						>
							<p className="body fcolor-evergreen fw-medium">
								{state.activeCompany === null
									? "none"
									: state.activeCompany.name}
							</p>
						</div>
					</div>
				</div>
				<Card variant="outlined" className="p-6 mb-6">
					<div className="crow mb-5">
						<SearchBar
							onChange={(d) => {
								actions.mutateState((p) => (p.query = d));
							}}
						/>
					</div>
					<div className="mb-2">
						<div className="mb-3">
							<FormCardHeader heading="Company List" subheading="Inactive" />
						</div>
						<div className="flex flex-wrap">
							{actions.search().map((v, i) => (
								<div
									onClick={(e) => {
										actions.setActive(v);
									}}
									key={i}
								>
									<Card
										sx={{ width: "fit-content" }}
										className="p-3 px-5 cursor-pointer m-1"
										variant="outlined"
									>
										<div className="crow select-none">
											<div className="mr-2">
												<img
													src={ImageIndex.CategoryImage}
													style={{
														width: 50,
														height: 50,
														borderRadius: 200,
														objectFit: "cover",
													}}
												/>
											</div>
											<p className="body fw-600 fcolor-iris">{v.name}</p>
										</div>
									</Card>
								</div>
							))}
						</div>
					</div>
				</Card>
				<div>
					<DefaultButton onClick={() => {}} label={"SAVE"} />
				</div>
			</FormContainer>
		</PopUpContainer>
	);
}
