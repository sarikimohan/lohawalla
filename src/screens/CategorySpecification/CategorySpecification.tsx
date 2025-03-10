import React, { useEffect, useState } from "react";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";
import style from "./CategorySpecification.module.css";
import ImagePreview from "@src/Components/common/ImagePreview/ImagePreview";
import useWidth from "@src/modules/hooks/useWidth";
import Spacer from "@src/Components/common/Spacer/Spacer";
import useHeight from "@src/modules/hooks/useHeight";
import { useNavigate, useParams } from "react-router-dom";
import AssetIndex from "@src/assets/AssetIndex";
import { Card } from "@mui/material";
import SpacingDiv from "@src/Components/common/Layout/SpacingDiv/SpacingDiv";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import CategorySpecificationAction from "./management/actions/CategorySpecificationAction";
import { H2 } from "@src/Components/common/Typography/TypeStyles";
import AddItem from "@src/forms/AddItem/AddItem";
import Header from "@src/Components/Grid/Header/Header";
import TableRow from "./components/TableRow/TableRow";
import RowStat from "@src/Components/Grid/RowStat/RowStat";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";
import LoadingWidget from "@src/Components/widget/LoadingWidget/LoadingWidget";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import EditCategory from "@src/forms/EditCategory/EditCategory";
import RotateAndScale from "@src/Components/interactions/RotateAndScale/RotateAndScale";
import DeleteEntity from "@src/Components/feedback/Alerts/DeleteEntity";
import AsyncProcessBoundary from "@src/Components/feedback/AsyncProcessBoundary/AsyncProcessBoundary";

export const CategorySpecificationContext = React.createContext({});

function CategorySpecification() {
	const widthService = useWidth();
	const heightService = useHeight();
	const { id } = useParams();
	const navigate = useNavigate();

	if (!id) return <p className="text-xl">no id found for category</p>;

	const [state, setState] = useState<CategorySpecification.State>({
		categorySpec: {
			_id: "",
			name: "",
			description: "",
			descriptionLabels: [],
			credit: [],
			negotiation: 0,
			images: [],
		},
		itemList: [],
		filter: {
			query: "",
			filters: [
				{
					id: "1",
					name: "item name",
					isActive: true,
				},
				{
					id: "2",
					name: "item code",
					isActive: true,
				},
			],
		},
		loading: {
			fetchItemData: AsyncStateFactory(),
			fetchSpecData: AsyncStateFactory(),
			deleteCategory: AsyncStateFactory(),
		},
		showForm: false,
		refresh: false,
		showEditForm: false,
		showDeleteForm: false,
	});
	const { categorySpec } = state;
	const specActions = new CategorySpecificationAction(state, (p) =>
		setState(p)
	);

	useEffect(() => {
		specActions.fetchData(id as string);
	}, [state.refresh]);

	const filteredList = specActions.filterList();

	return (
		<LoadingBoundary
			asyncState={[state.loading.fetchItemData, state.loading.fetchSpecData]}
			loadingWidget={<LoadingWidget />}
		>
			<CategorySpecificationContext.Provider value={{ label: "label" }}>
				<div ref={heightService.ref}>
					<BackNavBar title={"Category Specification"} />
				</div>
				<div
					style={{
						height: `calc(100vh - ${heightService.height}px)`,
						overflow: "auto",
						padding: 80,
						paddingTop: 40,
						background: "#fafafa",
					}}
				>
					<div className={style.headingRow + " mb-5"}>
						<H2>{categorySpec.name}</H2>
					</div>

					<div className="d-flex w-100 mb-8">
						<div className={style.col_1}>
							<div className="mb-6">
								<ImagePreview images={categorySpec.images} />
							</div>
							<div className={style.descriptionCard + " mb-6 bg-white"}>
								<div className={style.descriptionBanner}>
									<div className={style.descriptionCell}>
										<p className="fw-bold fcolor-light body">Credit</p>
									</div>
								</div>
								<div className={style.descriptionBody}>
									{categorySpec.credit.map((val, index) => (
										<div className="crow sb" key={index}>
											<div className={style.descriptionCell}>
												<p className="fw-bold fcolor-text-subtitle body">
													{val.days} days
												</p>
											</div>
											<div className={style.descriptionCell}>
												<p className="fw-medium fcolor-onyx body">
													{val.value} {val.isNumeric ? "₹" : "%"}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className={style.descriptionCard + " bg-white"}>
								<div className={style.descriptionBanner}>
									<div className={style.descriptionCell}>
										<p className="fw-bold fcolor-light body">
											Negotiation Details
										</p>
									</div>
								</div>
								<div className={style.descriptionBody}>
									<div className="crow sb">
										<div className={style.descriptionCell}>
											<p className="fw-bold fcolor-text-subtitle body">
												Negotiation
											</p>
										</div>
										<div className={style.descriptionCell}>
											<p className="fw-medium fcolor-onyx body">
												{categorySpec.negotiation}%
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={style.col_2}>
							<div className="crow">
								<div className="mb-6" style={{ marginRight: 100 }}>
									<p className="pretitle fcolor-text-subtitle mb-2">CATEGORY</p>
									<p className="body fw-bold fcolor-text-body">
										{categorySpec.name}
									</p>
								</div>
								<div className="flex">
									<div className="mr-2">
										<RotateAndScale>
											<div
												onClick={() => {
													specActions.mutateState((p) => {
														p.showEditForm = true;
													});
												}}
											>
												<AssetIndex.EditSquare />
											</div>
										</RotateAndScale>
									</div>
									<RotateAndScale>
										<div
											onClick={() => {
												specActions.mutateState((p) => {
													p.showDeleteForm = true;
												});
											}}
										>
											<AssetIndex.DeleteIcon />
										</div>
									</RotateAndScale>
								</div>
							</div>
							<div className={style.descriptionContainer + " mb-6"}>
								<p className="pretitle fcolor-text-subtitle mb-1">
									DESCRIPTION
								</p>
								<p className="body fw-medium fcolor-text-body">
									{categorySpec.description}
								</p>
							</div>

							<div className={style.descriptionCard + " bg-white"}>
								<div className={style.descriptionBanner}>
									<div className={style.descriptionCell}>
										<p className="fw-bold fcolor-light body">Description</p>
									</div>
									<div className={style.descriptionCell}>
										<p className="fw-bold fcolor-light body">Data</p>
									</div>
								</div>
								<div className={style.descriptionBody}>
									{categorySpec.descriptionLabels.map((val, index) => (
										<div className="crow sb" key={index}>
											<div className={style.descriptionCell}>
												<p className="fw-bold fcolor-text-subtitle body">
													{val.key}
												</p>
											</div>
											<div className={style.descriptionCell}>
												<p className="fw-medium fcolor-onyx body">
													{val.value}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<Card
						className={style.cardContainer}
						style={{
							borderRadius: "12px",
						}}
						variant="outlined"
					>
						<div ref={widthService.ref}>
							<p className="subtitle fcolor-onyx ">
								Items({state.itemList.length})
							</p>
							<Spacer height={40} />
							<SpacingDiv containerProps={{ className: "crow sb" }}>
								<div className="d-flex vc">
									<SpacingDiv marginRight={16}>
										<SearchBar
											onChange={(e) => {
												specActions.setQuery(e);
											}}
										/>
									</SpacingDiv>
									<div>
										<SearchFilters
											options={state.filter.filters}
											onItemClick={(e) => specActions.toggleFilter(e)}
										/>
									</div>
								</div>
								<div>
									<DefaultButton
										onClick={function (): void {
											specActions.mutateState((p) => {
												p.showForm = true;
											});
										}}
										label={"+ ADD ITEM"}
									/>
								</div>
							</SpacingDiv>
							<Spacer height={24} />
							<div>
								<table className="w-full table-auto">
									<Header
										columns={[
											"sr no",
											"item name",
											"item code",
											"entry time",
											{
												name: "",
												width: 100,
											},
										]}
									/>
									<tbody style={{ maxHeight: "330px", overflow: "auto" }}>
										<RowStat colSpan={5} isEmpty={filteredList.length === 0}>
											{filteredList.map((v, i) => (
												<TableRow
													data={v}
													key={i}
													link={`/categories/item/${v._id}?categoryName=${state.categorySpec.name}&categoryId=${id}`}
												/>
											))}
										</RowStat>
									</tbody>
								</table>
							</div>
						</div>
					</Card>
				</div>
				{state.showForm && (
					<AddItem
						onClose={function (): void {
							specActions.mutateState((p) => {
								p.showForm = false;
							});
						}}
						refresh={function (): void {
							specActions.mutateState((p) => {
								p.refresh = !p.refresh;
							});
						}}
						categoryId={id}
					/>
				)}
				{state.showEditForm && (
					<EditCategory
						refresh={function (): void {
							specActions.mutateState((p) => {
								p.refresh = !p.refresh;
							});
						}}
						close={function (): void {
							specActions.mutateState((p) => {
								p.showEditForm = false;
							});
						}}
						id={id}
					/>
				)}
				{state.showDeleteForm && (
					<AsyncProcessBoundary
						asyncStates={[state.loading.deleteCategory]}
						primaryAction={{
							onClick: () => {
								specActions.mutateState((p) => {
									p.showDeleteForm = false;
								});
							},
							label: "Close",
						}}
					>
						<DeleteEntity
							config={{
								primaryAction: {
									label: "Confirm",
									onClick: () => {
										specActions.deleteCategory(id, () => {
											navigate(-1);
										});
									},
								},
								secondaryActions: {
									label: "Cancel",
									onClick: () => {
										specActions.mutateState((p) => {
											p.showDeleteForm = false;
										});
									},
								},
							}}
							heading={"Delete Category"}
							subheading={
								"Do you confirm you want to delete this category? Note that deleting a category also deletes it's items and the products in them"
							}
							loading={state.loading.deleteCategory.status === "initialized"}
						/>
					</AsyncProcessBoundary>
				)}
			</CategorySpecificationContext.Provider>
		</LoadingBoundary>
	);
}

export default CategorySpecification;
