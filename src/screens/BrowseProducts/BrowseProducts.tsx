import { Autocomplete, Card, TextField } from "@mui/material";
import DefaultGrid from "@src/Components/Grid/Grid/DefaultGrid/DefaultGrid";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import React, { useState, useEffect } from "react";
import BrowseActions from "./actions/BrowseActions";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import TableRow from "./components/TableRow/TableRow";
import { useAuthGuardContext } from "@src/auth/AuthGuard/AuthGuard";
import Attention from "@src/Components/feedback/Alerts/Attention";
import { useSearchParams } from "react-router-dom";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";
import AddProductForm from "@src/forms/AddProduct/AddProductForm";

interface Props {}

export default function BrowseProducts(props: Props) {
	const [params, setParams] = useSearchParams();

	const _id = params.get("companyId");
	const companyName = params.get("companyName");

	const [state, setState] = useState<StateWithLoading<BrowseProducts.State>>({
		companiesList: [],
		categoryList: [],
		itemList: [],
		selectedCategory: {
			value: null,
		},
		selectedItem: { value: null },
		selectedCompany: {
			value: _id && companyName ? { _id, name: companyName } : null,
		},
		loading: {
			fetchCompanies: AsyncStateFactory(),
			fetchCategory: AsyncStateFactory(),
			fetchItems: AsyncStateFactory(),
			fetchProducts: AsyncStateFactory(),
			saveProducts: AsyncStateFactory(),
		},
		gridData: [],
		gridHeader: [],
		refresh: false,
		showAddForm: false,
	});

	const browseActions = new BrowseActions(state, setState);
	const { user } = useAuthGuardContext();

	useEffect(() => {
		browseActions.fetchProducts();
	}, [
		state.selectedCategory.value,
		state.selectedCompany.value,
		state.selectedItem.value,
		state.refresh,
	]);

	return (
		<div className="mx-6">
			<div className="w-full">
				<BackNavBar title={"Company Products"} />
			</div>
			<div className={"p-7"}>
				<Card variant="outlined" sx={{ padding: 5 }}>
					<div>
						<div className="crow mb-6 justify-between items-center">
							<p className="subtitle fcolor-onyx">
								Product Price ({state.gridData.length})
							</p>
						</div>
						<div className="crow sb items-center mb-4">
							<div className="flex flex-wrap">
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
										disabled={state.selectedCompany.value === null}
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
										loading={state.loading.fetchItems.status === "initialized"}
										clearOnEscape
										isOptionEqualToValue={(o, v) => o._id === v._id}
										value={state.selectedItem.value}
										disabled={state.selectedCategory.value === null}
									/>
								</div>
							</div>
							<div>
								<DefaultButton
									onClick={function (): void {
										browseActions.mutateState((p) => {
											p.showAddForm = true;
										});
									}}
									label={"add company product"}
								/>
							</div>
						</div>
						{state.selectedCompany.value ? (
							<>
								<div>
									<DefaultGrid
										tableAsyncState={state.loading.fetchProducts}
										columns={[
											{
												name: "sr no",
												width: 100,
											},
											"product name",
											...state.gridHeader,
										]}
									>
										{state.gridData.map((v, i) => (
											<TableRow
												index={i}
												data={v}
												key={i}
												onChange={function (
													position: number,
													data: string
												): void {
													browseActions.mutateState((p) => {
														p.gridData[i].priceStructure[position].value.value =
															data;
														p.gridData[i].priceStructure[
															position
														].value.hasChanged = true;
													});
												}}
											/>
										))}
									</DefaultGrid>
								</div>
								<div className="crow jfe mt-5">
									<DefaultButton
										onClick={function (): void {
											if (
												browseActions.validateEntry() &&
												state.gridHeader.length !== 0
											) {
												browseActions.save(user);
											}
										}}
										loading={
											state.loading.saveProducts.status === "initialized"
										}
										label={"Save"}
									/>
								</div>
							</>
						) : (
							<Attention severity={"warning"}>Please Select Company</Attention>
						)}
					</div>
				</Card>
			</div>
			{state.showAddForm && (
				<AddProductForm
					close={function (): void {
						browseActions.mutateState((p) => {
							p.showAddForm = false;
						});
					}}
					refresh={function (): void {
						browseActions.mutateState((p) => {
							p.refresh = !p.refresh;
						});
					}}
					selected={{
						company: state.selectedCompany.value
							? state.selectedCompany.value
							: undefined,
						category: state.selectedCategory.value
							? state.selectedCategory.value
							: undefined,
						item: state.selectedItem.value
							? state.selectedItem.value
							: undefined,
					}}
				/>
			)}
		</div>
	);
}
