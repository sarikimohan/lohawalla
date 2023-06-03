import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./CompanyProductListing.module.css";
import { columnConfig } from "./configuration/ProductGridConfiguration";
import useWidth from "@src/modules/hooks/useWidth";
import BackNavBar from "@src/Components/common/NavBar/BackNavBar";
import SearchBar from "@src/Components/common/SearchBar/SearchBar";
import DefaultButton from "@src/Components/common/buttons/DefaultButton/DefaultButton";
import Grid from "@src/Components/common/Grid/Grid";
import BannerContainer from "@src/Components/common/BannerContainer/BannerContainer";
import RowContainer from "@src/Components/common/Grid/RowContainer.default";
import CompanyProductsAction from "./managment/actions/CompanyProductAction";
import { InitialState } from "./managment/state/initialState";
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";
import LoadingWidget from "@src/Components/widget/LoadingWidget/LoadingWidget";
import useHeight from "@src/modules/hooks/useHeight";

function CompanyProductListing() {
	const widthService = useWidth();
	const { id } = useParams();
	const [refresh, setRefresh] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [state, setState] = useState<CompanyProducts.State>({
		products: [],
		filter: {
			query: "",
			filters: [],
		},
		loading: {
			fetch: AsyncStateFactory(),
		},
	});
	const CompanyProductActions = new CompanyProductsAction(state, setState);

	useEffect(() => {
		if (id) CompanyProductActions.fetchProducts(id as string);
	}, []);

	if (!id) return <p className="text-xl">no id provided</p>;

	const heightHandle = useHeight();

	const filteredList = CompanyProductActions.getFilteredList();

	return (
		<>
			<div className={style.navContainer} ref={heightHandle.ref}>
				<BackNavBar title={"Category/Item/Company Product"} />
			</div>
			<LoadingBoundary
				asyncState={state.loading.fetch}
				loadingWidget={
					<LoadingWidget height={`calc(100vh - ${heightHandle.height}px)`} />
				}
			>
				<div
					className={style.pageContainer + " p-14 bg-offWhite"}
					style={{
						height: `calc(100vh - ${heightHandle.height}px)`,
						overflow: "auto",
					}}
				>
					<Card
						className="p-8 w-100 mt-10"
						variant="outlined"
						sx={{ borderRadius: "12px" }}
					>
						<div ref={widthService.ref}>
							<div className="crow mb-6">
								<p className="subtitle fcolor-onyx">
									Company Products ({filteredList.length})
								</p>
							</div>
							<div className="crow sb mb-6">
								<div className="vc">
									<div className="pr-4">
										<SearchBar
											onChange={(e) => {
												CompanyProductActions.setQuery(e);
											}}
										/>
									</div>
									<div>
										{/* <SearchFilters options={[{ id: '1', label: 'filter 1 ' }]} onChange={() => {}} /> */}
									</div>
								</div>
								<DefaultButton
									onClick={() => {
										setShowForm(true);
									}}
									label={"+ add company product"}
								/>
							</div>
							<Grid<CompanyProducts.CompanyProduct>
								data={filteredList}
								config={columnConfig}
								BannerContainer={(children) => (
									<BannerContainer>{children}</BannerContainer>
								)}
								RowContainer={RowContainer<CompanyProducts.CompanyProduct>}
								width={widthService.width}
								paddingLeft={32}
								paddingRight={32}
							/>
						</div>
					</Card>
				</div>
			</LoadingBoundary>
		</>
	);
}

export default CompanyProductListing;
