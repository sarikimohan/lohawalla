import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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
import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import LoadingBoundary from "@src/Components/common/LoadingBoundary/LoadingBoundary";
import LoadingWidget from "@src/Components/widget/LoadingWidget/LoadingWidget";
import useHeight from "@src/modules/hooks/useHeight";
import AddProductForm from "@src/forms/AddProduct/AddProductForm";

function CompanyProductListing() {
	const widthService = useWidth();
	const { id } = useParams();
	const [params, seParams] = useSearchParams();
	const companyName = params.get("companyName");
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
	}, [refresh]);

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
						className="p-10 w-100 mt-10"
						variant="outlined"
						sx={{ borderRadius: "12px" }}
					>
						<div ref={widthService.ref}>
							<div className="crow mb-6">
								<p className="subtitle fcolor-onyx">
									{companyName} Company Products (
									{filteredList.length})
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
			{showForm && (
				<AddProductForm
					selected={{
						company: companyName
							? {
									_id: id,
									name: companyName,
							  }
							: undefined,
					}}
					close={function (): void {
						setShowForm(false);
					}}
					refresh={function (): void {
						setRefresh((p) => !p);
					}}
				/>
			)}
		</>
	);
}

export default CompanyProductListing;
