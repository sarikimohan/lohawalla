import { Autocomplete, Card, TextField } from "@mui/material";
import DefaultGrid from "@src/Components/Grid/Grid/DefaultGrid/DefaultGrid";
import TitleNavBar from "@src/Components/common/NavBar/TitleNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import DefaultFormLabel from "@src/Components/forms/FormLabel/DefaultFormLabel";
import React, { useState } from "react";
import BrowseActions from "./actions/BrowseActions";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";

interface Props {}

export default function BrowseProducts(props: Props) {
	const [state, setState] = useState<StateWithLoading<BrowseProducts.State>>({
		companiesList: [],
		categoryList: [],
		itemList: [],
		selectedCategory: { value: null },
		selectedItem: { value: null },
		selectedCompany: { value: null },
		loading: {
			fetchCompanies: AsyncStateFactory(),
			fetchCategory: AsyncStateFactory(),
			fetchItems: AsyncStateFactory(),
		},
	});

	const browseActions = new BrowseActions(state, setState);

	return (
		<div className="mx-6">
			<div className="w-full">
				<TitleNavBar title={"Company Products"} />
			</div>
			<div className={"p-7"}>
				<Card variant="outlined" sx={{ padding: 5 }}>
					<div>
						<div className="crow mb-6">
							<p className="subtitle fcolor-onyx">Product Price ({})</p>
						</div>
						<div className="crow sb">
							<div className="flex flex-wrap mb-4">
								<div className="p-3">
									<Autocomplete
										sx={{ width: 200 }}
										getOptionLabel={(d) => d.name}
										renderInput={(params) => (
											<TextField
												error={undefined}
												{...params}
												label="Company"
											/>
										)}
										options={state.companiesList}
										onOpen={() => {
											if (state.companiesList.length === 0)
												browseActions.getAllCompanyList();
										}}
										onChange={(e, val) => {
											browseActions.setSelectedCompany(val);
										}}
										onInputChange={(e, v, r) => {
											if (r === "clear") browseActions.setSelectedCompany(null);
										}}
										loading={
											state.loading.fetchCompanies.status === "initialized"
										}
										clearOnEscape
										isOptionEqualToValue={(o, v) => o._id === v._id}
										value={state.selectedCompany.value}
									/>
								</div>
								<div className="p-3">
									<Autocomplete
										sx={{ width: 200 }}
										getOptionLabel={(d) => d.name}
										renderInput={(params) => (
											<TextField
												error={undefined}
												{...params}
												label="Category"
											/>
										)}
										options={state.categoryList}
										onOpen={() => {
											if (state.categoryList.length === 0) {
												browseActions.getAllCategoryList();
											}
										}}
										onChange={(e, val) => {
											browseActions.setSelectedCategory(val);
										}}
										onInputChange={(e, v, r) => {
											if (r === "clear") {
												browseActions.setSelectedCategory(null);
											}
										}}
										loading={
											state.loading.fetchCategory.status === "initialized"
										}
										clearOnEscape
										isOptionEqualToValue={(o, v) => o._id === v._id}
										value={state.selectedCategory.value}
									/>
								</div>
								<div className="p-3">
									<Autocomplete
										sx={{ width: 200 }}
										getOptionLabel={(d) => d.name}
										renderInput={(params) => (
											<TextField error={undefined} {...params} label="Item" />
										)}
										options={state.itemList}
										onOpen={() => {
											browseActions.getAllItemList();
										}}
										onChange={(e, val) => {
											browseActions.setSelectedItem(val);
										}}
										onInputChange={(e, v, r) => {
											if (r === "clear") {
												browseActions.setSelectedItem(null);
											}
										}}
										loading={state.loading.fetchItems.status === 'initialized'}
										clearOnEscape
										isOptionEqualToValue={(o, v) => o._id === v._id}
										value={state.selectedItem.value}
										disabled={state.selectedCategory.value === null}
									/>
								</div>
							</div>
							<div>
								<DefaultButton
									onClick={function (): void {}}
									label={"add company product"}
								/>
							</div>
						</div>
						<div>
							<DefaultGrid
								columns={[
									{
										name: "sr no",
										width: 100,
									},
									"product name",
								]}
							></DefaultGrid>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
