import FilledScrollContainer from "@src/Components/common/Layout/FilledScrollContainer/FilledScrollContainer";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import LAYOUT_CONSTANTS from "@src/globals/constants/layout.constants";
import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { Subtitle } from "@src/Components/common/Typography/TypeStyles";
import SpacingDiv from "@src/Components/common/Layout/SpacingDiv/SpacingDiv";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import { InitialState } from "./management/state/InitialState";
import CategoryActions from "./management/actions/CategoryActions";
import useHeight from "@src/modules/hooks/useHeight";
import AddCategoryForm from "@src/forms/AddCategory/AddCategoryForm";
import Header from "@src/Components/Grid/Header/Header";
import TableRow from "./components/TableRow/TableRow";
import RowStat from "@src/Components/Grid/RowStat/RowStat";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";
import { useNavigate } from "react-router-dom";

function Categories() {
	const heightService = useHeight();
	const [state, setState] = useState<Categories.State>(InitialState);
	const categoryAction = new CategoryActions(state, setState);

	useEffect(() => {
		categoryAction.fetchCategoryGridData();
	}, [state.refresh]);

	return (
		<>
			<div className="mx-6">
				<div ref={heightService.ref}>
					<TitleNavBar title={"Categories"} />
				</div>
				<div
					style={{
						height: `calc(100vh - ${heightService.height}px)`,
						overflow: "auto",
					}}
					className="p-7"
				>
					<Card variant="outlined" sx={{ padding: 5 }}>
						<SpacingDiv marginBottom={24}>
							<Subtitle>
								Category({categoryAction.getCategoryGridData().length})
							</Subtitle>
						</SpacingDiv>
						<SpacingDiv
							containerProps={{ className: "crow sb" }}
							marginBottom={24}
						>
							<div className="d-flex vc">
								<SpacingDiv marginRight={16}>
									<SearchBar
										onChange={(e) => {
											categoryAction.setQuery(e);
										}}
									/>
								</SpacingDiv>
								<div>
									<SearchFilters
										options={categoryAction.getOptions()}
										onItemClick={(e) => categoryAction.toggleFilter(e)}
									/>
								</div>
							</div>
							<div>
								<DefaultButton
									onClick={function (): void {
										categoryAction.mutateState((p) => {
											p.showForm = true;
										});
									}}
									label={"+ ADD CATEGORY"}
								/>
							</div>
						</SpacingDiv>
						<LoadingBoundary asyncState={state.loading.get}>
							<table className="table-auto w-full">
								<Header
									columns={[
										"Sr no",
										"Category Name",
										"Category Code",
										"Entry Time",
										"No of Items",
										{
											name: "",
											width: 80,
										},
									]}
								/>
								<tbody>
									<RowStat
										colSpan={6}
										isEmpty={state.categoryList.length == 0}
										asyncState={state.loading.get}
									>
										{categoryAction.filterCategoryData().map((v, i) => {
											return <TableRow data={v} key={i} />;
										})}
									</RowStat>
								</tbody>
							</table>
						</LoadingBoundary>
					</Card>
				</div>
			</div>
			{state.showForm && (
				<AddCategoryForm
					onClose={() => {
						categoryAction.mutateState((p) => {
							p.showForm = false;
						});
					}}
					refresh={() => {
						categoryAction.mutateState((p) => void (p.refresh = !p.refresh));
					}}
				/>
			)}
		</>
	);
}

export default Categories;
