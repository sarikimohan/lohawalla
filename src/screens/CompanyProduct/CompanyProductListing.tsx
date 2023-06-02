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

function CompanyProductListing() {
	const widthService = useWidth();
	const { id } = useParams();
	const [refresh, setRefresh] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [state, setState] = useState<CompanyProducts.State>(InitialState);
	const CompanyProductActions = new CompanyProductsAction(state, setState);

	useEffect(() => {
		if (id) CompanyProductActions.fetchProducts(id as string);
	}, []);

	if (!id) return <p className="text-xl">no id provided</p>;

	console.log(state.products);

	return (
		<>
			<div className={style.navContainer}>
				<BackNavBar title={"Category/Item/Company Product"} />
			</div>
			<div className={style.pageContainer}>
				<Card className="p-8 w-100 mt-10" variant="outlined">
					<div ref={widthService.ref}>
						<div className="crow mb-6">
							<p className="subtitle fcolor-onyx">Company Products ({})</p>
						</div>
						<div className="crow sb mb-6">
							<div className="vc">
								<div className="pr-4">
									<SearchBar />
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
							data={state.products}
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
		</>
	);
}

export default CompanyProductListing;
