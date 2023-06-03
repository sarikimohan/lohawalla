import AssetIndex, { ImageIndex } from "@src/assets/AssetIndex";
import React, { useEffect, useState } from "react";
import style from "./ItemSpecification.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import useWidth from "@src/modules/hooks/useWidth";
import useHeight from "@src/modules/hooks/useHeight";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";
import ImagePreview from "@src/Components/common/ImagePreview/ImagePreview";
import Spacer from "@src/Components/common/Spacer/Spacer";
import { Card } from "@mui/material";
import Grid from "@src/Components/common/Grid/Grid";
import BannerContainer from "@src/Components/common/BannerContainer/BannerContainer";
import RowContainer from "@src/Components/common/Grid/RowContainer.default";
import { columnConfig } from "./configuration/CompanyProductGridConfig";
import { InitialState } from "./managment/state/initialState";
import ItemSpecificationAction from "./managment/actions/ItemSpecificationAction";
import SpacingDiv from "@src/Components/common/Layout/SpacingDiv/SpacingDiv";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import SearchFilters from "@src/Components/common/SearchFilters/SearchFilters";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import AddProductForm, {
	AddProductAutoConfig,
} from "@src/forms/AddProduct/AddProductForm";
import AsyncProcessBoundary from "@src/Components/feedback/AsyncProcessBoundary/AsyncProcessBoundary";
import LoadingWidget from "@src/Components/widget/LoadingWidget/LoadingWidget";

const ItemSpecificationContext = React.createContext({});

function ItemSpecification() {
	const widthService = useWidth();
	const { ref, height } = useHeight();
	const { pid } = useParams();

	const [state, setState] = useState<ItemSpecification.State>({
		itemName: "",
		categoryName: "",
		description: "",
		descriptionLabels: [],
		margin: {
			online: 0,
			cash: 0,
		},
		companyProductList: [],
		filter: {
			filters: [],
			query: "",
		},
		images: [],
		loading: {
			fetch: AsyncStateFactory(),
			fetchGrid: AsyncStateFactory(),
		},
		showForm: false,
		refresh: false,
	});

	if (!pid) return <p className="text-xl">no item id found</p>;

	const itemSpecActions = new ItemSpecificationAction(state, setState);
	const [params, setParams] = useSearchParams();

	const categoryName = params.get("categoryName");
	const categoryId = params.get("categoryId");

	const selected: AddProductAutoConfig = {
		category:
			categoryName && categoryId
				? { _id: categoryId, name: categoryName }
				: undefined,
		item: {
			_id: pid,
			name: state.itemName,
		},
	};

	useEffect(() => {
		itemSpecActions.fetch(pid as string);
		itemSpecActions.fetchGrid(pid as string);
	}, [state.refresh]);

	return (
		<LoadingBoundary
			asyncState={[state.loading.fetch, state.loading.fetchGrid]}
			loadingWidget={<LoadingWidget />}
		>
			<ItemSpecificationContext.Provider value={{}}>
				<div className={style.navContainer} ref={ref}>
					<BackNavBar title={"Category/Item"} />
				</div>
				<div
					className={style.pageContainer + " bg-offWhite"}
					style={{
						height: `calc(100vh - ${height}px)`,
						padding: 80,
						paddingTop: 40,
					}}
				>
					<div className={style.headingRow + " mb-6 mt-3"}>
						<p className="h2 fcolor-fuschia">{state.itemName}</p>
					</div>

					<div className="d-flex w-100 mb-5">
						<div className={style.col_1}>
							<div className="mb-6">
								<ImagePreview images={state.images} />
							</div>
							<div className={style.descriptionCard + " mb-3 bg-white"}>
								<div className={style.descriptionBanner}>
									<div className={style.descriptionCell}>
										<p className="fw-bold fcolor-light body">Margin</p>
									</div>
								</div>
								<div className={style.descriptionBody}>
									<div className="crow sb">
										<div className={style.descriptionCell}>
											<p className="fw-bold fcolor-text-subtitle body">
												Online
											</p>
										</div>
										<div className={style.descriptionCell}>
											<p className="fw-medium fcolor-onyx body">
												{state.margin.online}%
											</p>
										</div>
									</div>

									<div className="crow sb">
										<div className={style.descriptionCell}>
											<p className="fw-bold fcolor-text-subtitle body">Cash</p>
										</div>
										<div className={style.descriptionCell}>
											<p className="fw-medium fcolor-onyx body">
												{state.margin.cash}%
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className={style.col_2}>
							<div className="crow">
								<div className="mb-3" style={{ marginRight: 100 }}>
									<p className="pretitle fcolor-text-subtitle mb-1">CATEGORY</p>
									<p className="body fw-bold fcolor-text-body">
										{state.categoryName}
									</p>
								</div>
								<div onClick={() => {}}>
									<AssetIndex.EditSquare />
								</div>
							</div>
							<div className={style.descriptionContainer + " mb-6"}>
								<p className="pretitle fcolor-text-subtitle mb-1">
									DESCRIPTION
								</p>
								<p className="body fw-medium fcolor-text-body">
									{state.description}
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
									{state.descriptionLabels.map((val, index) => (
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
						className={style.cardContainer + " mb-8"}
						variant="outlined"
						style={{ borderRadius: "12px" }}
					>
						<div ref={widthService.ref}>
							<p className="subtitle fcolor-onyx ">
								Item Products ({state.companyProductList.length})
							</p>
							<Spacer height={40} />

							<SpacingDiv
								containerProps={{ className: "crow sb" }}
								marginBottom={24}
							>
								<div className="d-flex vc">
									<SpacingDiv marginRight={16}>
										<SearchBar
											onChange={(e) => {
												itemSpecActions.setQuery(e);
											}}
										/>
									</SpacingDiv>
									<div>
										<SearchFilters
											options={state.filter.filters}
											onItemClick={(e) => {}}
										/>
									</div>
								</div>
								<div>
									<DefaultButton
										onClick={function (): void {
											itemSpecActions.setshowForm(true);
										}}
										label={"+ ADD COMPANY PRODUCT"}
									/>
								</div>
							</SpacingDiv>
							<LoadingBoundary asyncState={state.loading.fetch}>
								<Grid<ItemSpecification.CompanyProduct>
									BannerContainer={(children) => {
										return (
											<BannerContainer width={widthService.width}>
												{children}
											</BannerContainer>
										);
									}}
									RowContainer={RowContainer<ItemSpecification.CompanyProduct>}
									width={widthService.width}
									paddingLeft={32}
									paddingRight={32}
									data={itemSpecActions.getFilteredList()}
									config={columnConfig}
								/>
							</LoadingBoundary>
						</div>
					</Card>
				</div>

				{state.showForm && (
					<AddProductForm
						close={function (): void {
							itemSpecActions.setshowForm(false);
						}}
						refresh={function (): void {
							itemSpecActions.mutateState((p) => {
								p.refresh = !p.refresh;
							});
						}}
						selected={selected}
					/>
				)}
			</ItemSpecificationContext.Provider>
		</LoadingBoundary>
	);
}

export default ItemSpecification;
