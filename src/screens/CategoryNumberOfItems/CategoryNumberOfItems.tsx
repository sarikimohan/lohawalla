import { Card } from "@mui/material";
import DefaultGrid from "@src/Components/Grid/Grid/DefaultGrid/DefaultGrid";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import React, { useState, useEffect } from "react";
import TableRow from "./components/TableRow/TableRow";
import ServerActions from "./actions/ServerActions";
import { useParams, Link } from "react-router-dom";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";
import SetActiveCompany from "@src/forms/SetActiveCompany/SetActiveCompany";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";

interface Props {}

export default function CategoryNumberOfItems(props: Props) {
	const [state, setState] = useState<
		StateWithLoading<CategoryNumberOfItems.State>
	>({
		grid: [],
		loading: {
			fetch: AsyncStateFactory(),
		},
		showForm: {
			status: false,
			id: "",
		},
		refresh: false,
	});

	const { id } = useParams();
	const categoryNumberOfItemsActions = new ServerActions(state, setState);

	useEffect(() => {
		if (id) {
			categoryNumberOfItemsActions.fetch(id);
		}
	}, []);

	return (
		<div className="mx-6">
			<div className="w-full">
				<BackNavBar title={"Category / Number of Item"} />
			</div>
			<div className={"p-7"}>
				<LoadingBoundary asyncState={state.loading.fetch}>
					<Card variant="outlined" sx={{ padding: 5 }}>
						<div>
							<div className="crow mb-6">
								<p className="subtitle fcolor-onyx">Number Of Items ()</p>
							</div>
							<div className="crow mb-6 sb">
								<div className="d-flex vc">
									<div className="mr-4">
										<SearchBar onChange={(e) => {}} />
									</div>
									<div>
										<SearchFilters options={[]} onItemClick={() => {}} />
									</div>
								</div>
								<div>
									<div className="flex">
										<div className="mr-2">
											<Link to={"/categories/viewMargin/" + id}>
												<DefaultButton
													onClick={function (): void {}}
													label={"view margin"}
												/>
											</Link>
										</div>
										<DefaultButton
											onClick={function (): void {}}
											label={"+ add items"}
										/>
									</div>
								</div>
							</div>
							<div>
								<DefaultGrid
									columns={[
										{
											name: "sr no",
											width: 100,
										},
										"item name",
										"price",
										"no of companies",
										"active company",
										"inactive company",
									]}
								>
									{state.grid.map((v, i) => (
										<TableRow
											data={v}
											onClick={() => {
												categoryNumberOfItemsActions.showForm(v._id);
											}}
										/>
									))}
								</DefaultGrid>
							</div>
						</div>
						<div className="mt-5 flex justify-end">
							<DefaultButton
								onClick={() => {}}
								label={"save"}
								defaultStyles={{
									container: { background: "var(--iris)" },
									text: { color: "#fff" },
								}}
							/>
						</div>
					</Card>
					{state.showForm.status && (
						<SetActiveCompany
							id={state.showForm.id}
							close={function (): void {
								categoryNumberOfItemsActions.closeForm();
							}}
							refresh={function (): void {
								categoryNumberOfItemsActions.refresh();
							}}
						/>
					)}
				</LoadingBoundary>
			</div>
		</div>
	);
}
